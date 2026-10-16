import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

/**
 * Custom Vite Plugin to load non-critical production CSS asynchronously via rel="preload"
 * with fallback for noscript, preventing render-blocking CSS bottlenecks.
 */
function asyncCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-async-css',
    enforce: 'post',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
        '<link rel="preload" href="$1" as="style" crossorigin onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>'
      );
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), asyncCssPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      minify: 'esbuild',
      cssMinify: 'esbuild',
      cssCodeSplit: false,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
