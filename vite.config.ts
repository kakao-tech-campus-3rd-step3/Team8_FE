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
      // 프록시 설정 추가(cors 해결되면 삭제 예정)
      '/api': {
        target: 'http://3.133.89.210:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
          });
        },
      },
    },
  },
});
