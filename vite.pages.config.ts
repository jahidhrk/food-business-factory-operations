import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'/food-business-factory-operations/',plugins:[react()],build:{outDir:'pages-dist',emptyOutDir:true},publicDir:'public'});
