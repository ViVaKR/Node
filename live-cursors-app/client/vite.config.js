import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// __dirname 대체
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
  //   },
  // },
})
