import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  /* Fix port */
  server: {
    port: 5173,
    // CORS 문제 해결시 삭제 가능(프록시 설정)
    proxy: {
      '/api': {
        target: 'http://18.118.161.98:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
