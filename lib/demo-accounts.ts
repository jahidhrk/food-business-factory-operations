import {roles,type Role} from './catalog';
// Intentionally published showcase credentials; never use these for factory access.
export const demoPassword='Demo123!';
export const demoAccounts=roles.map(role=>({id:role.id,username:`${role.id}.demo`,name:role.name}));
export function authenticateDemo(username:unknown,password:unknown):Role|null {
 if(typeof username!=='string'||password!==demoPassword)return null;
 return demoAccounts.find(a=>a.username===username.trim().toLowerCase())?.id??null;
}
