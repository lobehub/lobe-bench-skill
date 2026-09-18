import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const slug = process.env.VITE_BENCHMARK;

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'antd-style'],
  },
  build: {
    outDir: slug ? `output/${slug}` : 'output',
  },
});
