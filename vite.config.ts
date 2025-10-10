import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  /* Fix port */
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // 👇 이 부분을 새로운 서버 주소로 변경했습니다.
        target: 'http://3.133.89.210:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});