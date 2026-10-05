import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import ts from 'typescript';
const out=resolve('.sites-runtime/test-supabase');mkdirSync(out,{recursive:true});
for(const file of ['catalog','engine','demo-accounts'])writeFileSync(`${out}/${file}.mjs`,ts.transpileModule(readFileSync(`lib/${file}.ts`,'utf8').replace("from './catalog'","from './catalog.mjs'"),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText);
const source=readFileSync('supabase/handler.ts','utf8').replace(/from '\.\.\/lib\/(.*?)'/g,"from './$1.mjs'");
writeFileSync(`${out}/handler.mjs`,ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText);
globalThis.Deno={env:{get(name){return {SUPABASE_URL:'https://supabase.test',SUPABASE_SECRET_KEYS:'{"default":"test-server-key"}'}[name]}},serve(){}};
const {handle}=await import(`${out}/handler.mjs`);
let workspace=null;const sessions=new Map(),objects=new Map();
globalThis.fetch=async(url,init={})=>{
 const u=new URL(url),headers=new Headers(init.headers);
 assert.equal(headers.get('apikey'),'test-server-key');
 const method=init.method||'GET';const payload=typeof init.body==='string'?JSON.parse(init.body):init.body;
 if(u.pathname==='/rest/v1/factory_workspace'){
  if(method==='GET')return Response.json(workspace?[workspace]:[]);
  if(method==='POST'){workspace??=structuredClone(payload);return new Response(null,{status:201});}
  if(method==='PATCH'){if(Number(u.searchParams.get('version')?.slice(3))!==workspace.version)return Response.json([]);workspace={...workspace,...structuredClone(payload)};return Response.json([workspace]);}
 }
 if(u.pathname==='/rest/v1/factory_sessions'){
  const token=u.searchParams.get('token_hash')?.slice(3);
  if(method==='GET')return Response.json(sessions.has(token)?[sessions.get(token)]:[]);
  if(method==='POST'){sessions.set(payload.token_hash,payload);return new Response(null,{status:201});}
  if(method==='DELETE'){if(token)sessions.delete(token);return new Response(null,{status:204});}
 }
 if(u.pathname.startsWith('/storage/v1/object/')){
  const id=u.pathname.split('/').at(-1);
  if(method==='POST'){objects.set(id,{body:init.body,type:headers.get('Content-Type')});return Response.json({});}
  if(method==='DELETE'){for(const p of payload.prefixes)objects.delete(p);return Response.json({});}
  if(method==='GET'){const obj=objects.get(id);return obj?new Response(obj.body,{headers:{'Content-Type':obj.type}}):new Response(null,{status:404});}
 }
 throw Error('Unexpected mock request '+url);
};
const req=(endpoint,token,body,origin='https://jahidhrk.github.io')=>new Request(`https://supabase.test/functions/v1/factory-api/${endpoint}`,{method:body?'POST':'GET',headers:{Origin:origin,...(token?{'X-Demo-Session':token}:{}),...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
async function login(role){const response=await handle(req('login',null,{command:{type:'profile',username:`${role}.demo`,password:'Demo123!'}}));assert.equal(response.status,200);return response.json();}
test('backend refuses unauthenticated operational reads and unknown origins',async()=>{assert.equal((await handle(req('operations'))).status,401);assert.equal((await handle(req('login',null,{username:'admin.demo',password:'Demo123!'},'https://evil.test'))).status,403);});
test('incorrect demo credentials create no session',async()=>{const before=sessions.size;assert.equal((await handle(req('login',null,{username:'admin.demo',password:'wrong'}))).status,401);assert.equal(sessions.size,before);});
test('all department accounts get independent role-bound tokens',async()=>{const tokens=new Set();for(const role of ['admin','receiving','warehouse','planning','production','qc','laboratory','dispatch','management']){const data=await login(role);assert.equal(data.state.profile,role);assert.match(data.token,/^[a-f0-9]{64}$/);assert.ok(!sessions.has(data.token));tokens.add(data.token);}assert.equal(tokens.size,9);});
test('management cannot change master data or forge admin role',async()=>{const account=await login('management');const cmd={type:'master',entry:{category:'Product',name:'Forged'}};assert.equal((await handle(req('operations',account.token,{version:account.version,command:cmd}))).status,400);assert.equal((await handle(req('operations',account.token,{version:account.version,command:{type:'profile',role:'admin'}}))).status,400);assert.equal(workspace.version,0);});
test('shared saves appear under the reader role and stale saves are rejected',async()=>{const admin=await login('admin'),qc=await login('qc');const response=await handle(req('operations',admin.token,{version:0,command:{type:'master',entry:{category:'Product',name:'Shared demo product'}}}));assert.equal(response.status,200);assert.equal(workspace.payload.profile,null);const read=await(await handle(req('operations',qc.token))).json();assert.equal(read.state.profile,'qc');assert.ok(read.state.masters.some(m=>m.name==='Shared demo product'));assert.equal((await handle(req('operations',admin.token,{version:0,command:{type:'master',entry:{category:'Product',name:'Stale'}}}))).status,409);});
test('parallel writes use optimistic CAS and keep exactly one update',async()=>{const a=await login('admin');const v=workspace.version;const requests=[1,2].map(i=>handle(req('operations',a.token,{version:v,command:{type:'master',entry:{category:'Product',name:`Concurrent ${i}`}}})));const results=await Promise.all(requests);assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);assert.equal(workspace.version,v+1);});
test('attachments are persisted and downloaded only through a valid session',async()=>{const a=await login('admin');const fd=new FormData();fd.append('record','DEMO-PLANNING');fd.append('file',new File(['%PDF-1.7 demo'],'note.pdf',{type:'application/pdf'}));const res=await handle(new Request('https://supabase.test/functions/v1/factory-api/attachments',{method:'POST',headers:{Origin:'https://jahidhrk.github.io','X-Demo-Session':a.token},body:fd}));assert.equal(res.status,200);const saved=await res.json();const id=saved.state.records.find(r=>r.id==='DEMO-PLANNING').attachments.at(-1).id;assert.equal((await handle(req(`attachments?id=${id}`,a.token))).status,200);assert.equal((await handle(req(`attachments?id=${id}`))).status,401);});
test('logout revokes the session on the backend',async()=>{const a=await login('admin');assert.equal((await handle(req('logout',a.token,{}))).status,200);assert.equal((await handle(req('operations',a.token))).status,401);});
test('expired sessions cannot access saved records',async()=>{const a=await login('qc');for(const value of sessions.values())if(value.department==='qc')value.expires_at='2020-01-01T00:00:00Z';assert.equal((await handle(req('operations',a.token))).status,401);});
