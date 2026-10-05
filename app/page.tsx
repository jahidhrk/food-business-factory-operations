import FactoryApp from './workspace';
import {getChatGPTUser} from './chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Home(){const user=await getChatGPTUser();return <FactoryApp signedIn={!!user}/>;}
