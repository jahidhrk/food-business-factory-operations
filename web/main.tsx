import React from 'react';
import {createRoot} from 'react-dom/client';
import FactoryApp from '../app/workspace';
import {factoryApi} from './client';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><FactoryApp signedIn={true} api={factoryApi}/></React.StrictMode>);
