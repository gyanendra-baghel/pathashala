import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd());

  const proxyApiUrl = env.VITE_API_URL || process.env.VITE_API_URL;

  return {
    plugins: [react()],
    server:{
      proxy:{
        '/api': proxyApiUrl
      }
    }
  }
})
