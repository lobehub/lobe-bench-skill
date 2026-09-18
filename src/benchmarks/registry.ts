import type { BenchmarkEntry, BenchmarkMeta } from '../template/types.ts';

const pageModules = import.meta.glob('./*/Page.tsx', { eager: true }) as Record<
  string,
  { default: BenchmarkEntry['Page'] }
>;
const metaModules = import.meta.glob('./*/meta.ts', { eager: true }) as Record<
  string,
  { meta: BenchmarkMeta }
>;

const DEFAULT_SLUG = 'column-chart-example';

export const benchmarks: Record<string, BenchmarkEntry> = {};

for (const [path, mod] of Object.entries(metaModules)) {
  const dir = path.replace(/^\.\//, '').replace(/\/meta\.ts$/, '');
  const page = pageModules[`./${dir}/Page.tsx`];
  if (!page?.default) continue;
  benchmarks[mod.meta.slug] = { ...mod.meta, Page: page.default };
}

export const resolveBenchmarkSlug = () => {
  const fromEnv = import.meta.env.VITE_BENCHMARK as string | undefined;
  if (fromEnv && benchmarks[fromEnv]) return fromEnv;

  if (typeof window !== 'undefined') {
    const fromQuery = new URLSearchParams(window.location.search).get('b');
    if (fromQuery && benchmarks[fromQuery]) return fromQuery;
  }

  return benchmarks[DEFAULT_SLUG] ? DEFAULT_SLUG : Object.keys(benchmarks)[0];
};

export const getActiveBenchmark = () => {
  const slug = resolveBenchmarkSlug();
  const entry = (slug && benchmarks[slug]) || Object.values(benchmarks)[0];
  if (!entry) {
    throw new Error('No benchmarks registered under src/benchmarks/*/');
  }
  return entry;
};
