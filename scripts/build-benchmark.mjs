import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const slug = process.argv[2] ?? process.env.VITE_BENCHMARK ?? 'column-chart-example';
const page = resolve(process.cwd(), 'src/benchmarks', slug, 'Page.tsx');

if (!existsSync(page)) {
  console.error(`Unknown benchmark "${slug}". Expected ${page}`);
  process.exit(1);
}

const env = { ...process.env, VITE_BENCHMARK: slug };
const outDir = `output/${slug}`;

const tsc = spawn('./node_modules/.bin/tsc', ['-b', '--pretty', 'false'], {
  env,
  stdio: 'inherit',
});

tsc.on('exit', (code) => {
  if (code !== 0) process.exit(code ?? 1);

  const vite = spawn(
    './node_modules/.bin/vite',
    ['build', '--outDir', outDir, '--base', './'],
    { env, stdio: 'inherit' },
  );

  vite.on('exit', (viteCode) => process.exit(viteCode ?? 1));
});
