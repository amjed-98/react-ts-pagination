import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  server: {
    open: '/src/demo/index.html',
  },

  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'react-pagination',
      formats: ['es', 'umd'],
      fileName: (format) => `react-pagination.${format}.js`,
    },

    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
