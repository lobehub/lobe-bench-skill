import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const slug = process.env.VITE_BENCHMARK;

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  resolve: {
    dedupe: ['react', 'react-dom', 'antd-style'],
  },
  build: {
    assetsInlineLimit: 12 * 1024,
    modulePreload: false,
    outDir: slug ? `output/${slug}` : 'output',
  },
});
