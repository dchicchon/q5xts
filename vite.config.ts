import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4815,
  },
  root: './tests/environment',
  base: '/q5xts',
  plugins: [react()],
});
