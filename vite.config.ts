import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          cart: path.resolve(__dirname, 'cart.html'),
          checkout: path.resolve(__dirname, 'checkout.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          orderSuccess: path.resolve(__dirname, 'order-success.html'),
          productDetail: path.resolve(__dirname, 'product-detail.html'),
          products: path.resolve(__dirname, 'products.html'),
          specialOffers: path.resolve(__dirname, 'special-offers.html'),
        },
      },
    },
  };
});
