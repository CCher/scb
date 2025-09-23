import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({

  base: '/scb/', 

  build: {
    outDir: 'scb',         // выходная папка (в вашем ТЗ — scb/)
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/scripts.[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          const ext = path.extname(name).slice(1)
          if (ext === 'css') return 'assets/css/styles.[hash][extname]'
          if (/(png|jpe?g|svg|gif|webp|avif)/.test(ext)) return 'assets/images/[name][extname]'
          return 'assets/[name][extname]'
        }
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~styles': path.resolve(__dirname, 'src/styles'),
      '~images': path.resolve(__dirname, 'public/images'),
      '~js': path.resolve(__dirname, 'src/js'),
      '~fonts': path.resolve(__dirname, 'src/fonts')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {}
    }
  },

  server: {
    port: 3000,
    host: 'localhost'
  },

  publicDir: 'public', 
});