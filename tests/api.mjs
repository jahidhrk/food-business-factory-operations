import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import ts from 'typescript';
const out=resolve('.sites-runtime/test-api');mkdirSync(out,{recursive:true});
for(const file of ['catalog','engine','demo-accounts'])writeFileSync(`${out}/${file}.mjs`,ts.transpileModule(readFileSync(`lib/${file}.ts`,'utf8').replace("from './catalog'","from './catalog.mjs'"),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText);
writeFileSync(`${out}/context.mjs`,"export const env={}; export let identity=null; export function setIdentity(v){identity=v}; export async function getChatGPTUser(){return identity};\n");
for(const kind of ['operations','attachments']){let source=readFileSync(`app/api/${kind}/route.ts`,'utf8').replace("import { env } from 'cloudflare:workers';","import {env} from './context.mjs';").replace("import {env} from 'cloudflare:workers';","import {env} from './context.mjs';").replace("from '../../chatgpt-auth'","from './context.mjs'").replace("from '../../../lib/engine'","from './engine.mjs'").replace("from '../../../lib/demo-accounts'","from './demo-accounts.mjs'");writeFileSync(`${out}/${kind}.mjs`,ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText);}
const context=await import(`${out}/context.mjs`),operations=await import(`${out}/operations.mjs`),attachments=await import(`${out}/attachments.mjs`);
const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_left_justice.sql','utf8'));const objects=new Map();
context.env.DB={
  prepare(sql){
    return {bind(...params){
      return {
        async first(){return db.prepare(sql).get(...params)||null;},
        async run(){const result=db.prepare(sql).run(...params);return {meta:{changes:Number(result.changes)}};}
      };
    }};
  }
};
context.env.BUCKET={async put(key,bytes,options){objects.set(key,{bytes,options})},async get(key){const obj=objects.get(key);return obj?{body:obj.bytes,httpMetadata:obj.options.httpMetadata}:null},async delete(key){objects.delete(key)}};
const owner={userId:'test-owner',displayName:'Test owner',email:'owner@example.test'};
const req=(command,version,origin='https://factory.test')=>new Request('https://factory.test/api/operations',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({command,version})});
test('API rejects unauthenticated access',async()=>{context.setIdentity(null);assert.equal((await operations.GET()).status,401);assert.equal((await operations.POST(req({type:'profile',role:'admin',username:'admin.demo',password:'Demo123!'},0))).status,401)});
test('D1 persists saved data across independent reads',async()=>{context.setIdentity(owner);const first=await(await operations.GET()).json();assert.equal(first.version,0);const response=await operations.POST(req({type:'profile',role:'admin',username:'admin.demo',password:'Demo123!'},0));assert.equal(response.status,200);const saved=await(await operations.GET()).json();assert.equal(saved.state.profile,'admin');assert.equal(saved.version,1);assert.equal(db.prepare('SELECT COUNT(*) AS n FROM workspaces').get().n,1);});
test('stale versions cannot overwrite saved work',async()=>{context.setIdentity(owner);assert.equal((await operations.POST(req({type:'profile',role:'qc'},0))).status,409);const data=await(await operations.GET()).json();assert.equal(data.state.profile,'admin');});
test('owner workspaces are isolated',async()=>{context.setIdentity({...owner,userId:'other-owner'});const data=await(await operations.GET()).json();assert.equal(data.state.profile,null);assert.equal(data.version,0);context.setIdentity(owner);assert.equal((await(await operations.GET()).json()).state.profile,'admin');});
test('cross-origin writes are rejected',async()=>{context.setIdentity(owner);assert.equal((await operations.POST(req({type:'profile',role:'qc'},1,'https://other.test'))).status,403);});
test('failed approval preserves the stored version and inventory',async()=>{context.setIdentity(owner);const before=await(await operations.GET()).json();const res=await operations.POST(req({type:'approve',id:'DEMO-RECEIVING',note:''},before.version));assert.equal(res.status,400);const after=await(await operations.GET()).json();assert.equal(after.version,before.version);assert.deepEqual(after.state.lots,before.state.lots);});
test('direct attachment metadata injection is rejected',async()=>{context.setIdentity(owner);assert.equal((await operations.POST(req({type:'attachment',id:'DEMO-PLANNING',attachment:{id:'ATT-12345678'}},1))).status,400);});
test('attachments persist and cannot be read by another owner',async()=>{context.setIdentity(owner);const data=new FormData();data.append('record','DEMO-PLANNING');data.append('file',new File(['%PDF-1.7 demo'],'note.pdf',{type:'application/pdf'}));const res=await attachments.POST(new Request('https://factory.test/api/attachments',{method:'POST',headers:{Origin:'https://factory.test'},body:data}));assert.equal(res.status,200);const payload=await res.json();const id=payload.state.records.find(r=>r.id==='DEMO-PLANNING').attachments[0].id;assert.equal((await attachments.GET(new Request(`https://factory.test/api/attachments?id=${id}`))).status,200);context.setIdentity({...owner,userId:'other-owner'});assert.equal((await attachments.GET(new Request(`https://factory.test/api/attachments?id=${id}`))).status,404);});

test('demo login rejects wrong passwords without changing permissions',async()=>{context.setIdentity(owner);const before=await(await operations.GET()).json();const response=await operations.POST(req({type:'profile',role:'admin',username:'qc.demo',password:'wrong'},before.version));assert.equal(response.status,401);const after=await(await operations.GET()).json();assert.equal(after.version,before.version);assert.equal(after.state.profile,before.state.profile);});
test('all nine demo accounts select server-validated roles and support logout',async()=>{context.setIdentity(owner);for(const role of ['admin','receiving','warehouse','planning','production','qc','laboratory','dispatch','management']){const before=await(await operations.GET()).json();const response=await operations.POST(req({type:'profile',role:'admin',username:`${role}.demo`,password:'Demo123!'},before.version));assert.equal(response.status,200);assert.equal((await response.json()).state.profile,role);}const before=await(await operations.GET()).json();const response=await operations.POST(req({type:'profile',role:null},before.version));assert.equal((await response.json()).state.profile,null);});
