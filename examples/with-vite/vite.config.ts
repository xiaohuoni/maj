import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: join(__dirname, 'src'),
    },
  },
});
