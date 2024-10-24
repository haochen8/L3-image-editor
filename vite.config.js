import { resolve } from 'path';

export default {
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        test: resolve(__dirname, 'test-app/index.html')
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
};
