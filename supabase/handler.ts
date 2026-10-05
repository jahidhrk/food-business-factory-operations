import {execute,seed,uid,type State} from '../lib/engine';
import {authenticateDemo} from '../lib/demo-accounts';
import {roles,type Role} from '../lib/catalog';
declare const Deno:{env:{get(name:string):string|undefined};serve(handler:(req:Request)=>Promise<Response>):unknown};
const allowedOrigins=['https://jahidhrk.github.io','http://localhost:5173','http://127.0.0.1:5173'];
const bucket='factory-attachments';
class HttpError extends Error{constructor(public status:number,message:string){super(message);}}
function settings(){
 const url=Deno.env.get('SUPABASE_URL');
 const keys=JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')||'{}');
 const key=keys.default||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 if(!url||!key)throw new HttpError(503,'Backend configuration is incomplete.');
 return {url,key};
}
async function service(path:string,init:RequestInit={}):Promise<Response>{
 const {url,key}=settings();const headers=new Headers(init.headers);headers.set('apikey',key);headers.set('Authorization',`Bearer ${key}`);
 const res=await fetch(url+path,{...init,headers});
 if(!res.ok){console.error('Supabase operation failed',res.status,path.split('?')[0]);throw new HttpError(503,'Database or storage is not ready. Complete the Supabase setup instructions.');}
 return res;
}
const jsonHeaders={'Content-Type':'application/json'};
async function hash(value:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return [...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,'0')).join('');}
async function readWorkspace(){
 const rows:any[]=await(await service('/rest/v1/factory_workspace?id=eq.demo&select=payload,version')).json();
 if(rows[0])return rows[0] as {payload:State;version:number};
 await service('/rest/v1/factory_workspace',{method:'POST',headers:{...jsonHeaders,Prefer:'resolution=ignore-duplicates'},body:JSON.stringify({id:'demo',payload:seed(),version:0})});
 const again:any[]=await(await service('/rest/v1/factory_workspace?id=eq.demo&select=payload,version')).json();
 if(!again[0])throw new HttpError(503,'Unable to initialize the workspace.');return again[0] as {payload:State;version:number};
}
async function session(req:Request){
 const token=req.headers.get('X-Demo-Session')||'';
 if(!/^[a-f0-9]{64}$/.test(token))throw new HttpError(401,'Sign in with your demo account.');
 const tokenHash=await hash(token);
 const rows:any[]=await(await service(`/rest/v1/factory_sessions?token_hash=eq.${tokenHash}&select=department,expires_at`)).json();
 if(!rows[0]||new Date(rows[0].expires_at).getTime()<=Date.now())throw new HttpError(401,'Your session expired. Sign in again.');
 return {role:rows[0].department as Role,tokenHash};
}
function data(row:{payload:State;version:number},role:Role){return {state:{...row.payload,profile:role},version:row.version,user:{name:roles.find(r=>r.id===role)!.person,email:`${role}.demo`}};}
async function persist(state:State,version:number){
 const res=await service(`/rest/v1/factory_workspace?id=eq.demo&version=eq.${version}`,{method:'PATCH',headers:{...jsonHeaders,Prefer:'return=representation'},body:JSON.stringify({payload:{...state,profile:null},version:version+1,updated_at:new Date().toISOString()})});
 const rows:any[]=await res.json();if(rows.length!==1)throw new HttpError(409,'Another department saved changes first. Refresh and try again.');return {payload:rows[0].payload as State,version:rows[0].version as number};
}
async function body(req:Request){const raw=await req.text();if(raw.length>300000)throw new HttpError(413,'Request too large.');try{return JSON.parse(raw);}catch{throw new HttpError(400,'Invalid request.');}}
export async function handle(req:Request):Promise<Response>{
 const origin=req.headers.get('Origin')||'';
 const cors:Record<string,string>={'Access-Control-Allow-Headers':'apikey,content-type,x-demo-session','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Vary':'Origin','Cache-Control':'no-store'};
 if(origin&&allowedOrigins.includes(origin))cors['Access-Control-Allow-Origin']=origin;
 const reply=(payload:unknown,status=200)=>Response.json(payload,{status,headers:cors});
 if(origin&&!allowedOrigins.includes(origin))return reply({error:'This website is not authorized to use this demo.'},403);
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
 try{
 const url=new URL(req.url),endpoint=url.pathname.split('/').at(-1);
 if(endpoint==='health'&&req.method==='GET')return reply({status:'ok',application:'factory-operations'});
 if(endpoint==='login'&&req.method==='POST'){
  const input=await body(req),command=input.command||input;
  const role=authenticateDemo(command.username,command.password);if(!role)throw new HttpError(401,'Incorrect demo user ID or password.');
  const row=await readWorkspace();
  // Token values never enter the database, audit log or source control.
  const token=[...crypto.getRandomValues(new Uint8Array(32))].map(b=>b.toString(16).padStart(2,'0')).join('');
  await service(`/rest/v1/factory_sessions?expires_at=lt.${encodeURIComponent(new Date().toISOString())}`,{method:'DELETE'});
  await service('/rest/v1/factory_sessions',{method:'POST',headers:jsonHeaders,body:JSON.stringify({token_hash:await hash(token),department:role,expires_at:new Date(Date.now()+8*60*60*1000).toISOString()})});
  return reply({...data(row,role),token});
 }
 const account=await session(req);
 if(endpoint==='logout'&&req.method==='POST'){await service(`/rest/v1/factory_sessions?token_hash=eq.${account.tokenHash}`,{method:'DELETE'});return reply({signedOut:true});}
 const row=await readWorkspace();
 if(endpoint==='operations'&&req.method==='GET')return reply(data(row,account.role));
 if(endpoint==='operations'&&req.method==='POST'){
  const input=await body(req);
  if(input.version!==row.version)throw new HttpError(409,'Workspace changed. Refresh and try again.');
  if(['profile','attachment'].includes(input.command?.type))throw new HttpError(400,'Use the dedicated login or attachment endpoint.');
  const next=execute({...row.payload,profile:account.role},input.command);
  return reply(data(await persist(next,row.version),account.role));
 }
 if(endpoint==='attachments'&&req.method==='POST'){
  if(Number(req.headers.get('Content-Length')||0)>9*1024*1024)throw new HttpError(413,'Upload a file up to 8 MB.');
  const form=await req.formData(),file=form.get('file'),recordId=String(form.get('record')||'');
  if(!(file instanceof File)||!['application/pdf','image/jpeg','image/png'].includes(file.type)||file.size>8*1024*1024)throw new HttpError(400,'Upload a PDF, JPG or PNG up to 8 MB.');
  const id=uid('ATT'),objectPath=`/storage/v1/object/${bucket}/${id}`;
  const next=execute({...row.payload,profile:account.role},{type:'attachment',id:recordId,attachment:{id,name:file.name.slice(0,200),type:file.type,size:file.size}});
  await service(objectPath,{method:'POST',headers:{'Content-Type':file.type},body:await file.arrayBuffer()});
  try{return reply(data(await persist(next,row.version),account.role));}catch(e){await service(`/storage/v1/object/${bucket}`,{method:'DELETE',headers:jsonHeaders,body:JSON.stringify({prefixes:[id]})});throw e;}
 }
 if(endpoint==='attachments'&&req.method==='GET'){
  const id=url.searchParams.get('id')||'';
  if(!/^ATT-[A-F0-9]{8}$/.test(id)||!row.payload.records.some(r=>r.attachments.some(a=>a.id===id)))throw new HttpError(404,'Attachment not found.');
  const res=await service(`/storage/v1/object/authenticated/${bucket}/${id}`);
  return new Response(res.body,{headers:{...cors,'Content-Type':res.headers.get('Content-Type')||'application/octet-stream','Content-Disposition':'attachment','X-Content-Type-Options':'nosniff'}});
 }
 return reply({error:'Endpoint not found.'},404);
 }catch(e){if(e instanceof HttpError)return reply({error:e.message},e.status);return reply({error:e instanceof Error?e.message:'Request failed.'},400);}
}
Deno.serve(handle);
