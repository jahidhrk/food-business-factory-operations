import {seed} from '../lib/engine';
import {supabaseUrl,publishableKey} from './config';
const sessionKey='factory-demo-session-v1';
function empty(){return {state:seed(),version:0,user:{name:'Department demo',email:''}};}
export async function factoryApi(path:string,init:RequestInit={}):Promise<Response>{
 const command=typeof init.body==='string'?JSON.parse(init.body)?.command:null;
 const login=command?.type==='profile'&&command.role!==null;
 const logout=command?.type==='profile'&&command.role===null;
 const token=localStorage.getItem(sessionKey);
 if(!token&&!login)return path==='/api/operations'?Response.json(empty()):Response.json({error:'Sign in to download attachments.'},{status:401});
 const headers=new Headers(init.headers);headers.set('apikey',publishableKey);
 if(token)headers.set('X-Demo-Session',token);
 let endpoint=path.replace('/api/','');
 if(login)endpoint='login';
 if(logout)endpoint='logout';
 const response=await fetch(`${supabaseUrl}/functions/v1/factory-api/${endpoint}`,{...init,headers});
 if(logout&&response.ok){localStorage.removeItem(sessionKey);return Response.json(empty());}
 if(response.status===401&&!login){localStorage.removeItem(sessionKey);if(path==='/api/operations')return Response.json(empty());}
 if(login&&response.ok){const payload:any=await response.json();localStorage.setItem(sessionKey,payload.token);delete payload.token;return Response.json(payload);}
 return response;
}
