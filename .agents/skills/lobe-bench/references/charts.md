# LobeBench chart reference

Official chart docs (source of API / demo patterns):

- [BenchmarkColumnChart `index.mdx`](https://github.com/lobehub/lobe-charts/blob/master/src/BenchmarkColumnChart/index.mdx)
- [BenchmarkRankingChart `index.mdx`](https://github.com/lobehub/lobe-charts/blob/master/src/BenchmarkRankingChart/index.mdx)

`@lobehub/icons` is a **consumer** dependency. The charts package does not bundle icons or brand colors.

## Stack

Vite 8, React 19, pnpm, `@lobehub/ui` + `@lobehub/ui/storybook`, `@lobehub/icons`, `@lobehub/charts`. Theme: `ConfigProvider` + `ThemeProvider` in `src/main.tsx`.

## Folders

```
src/template/                 Poster, Logo, adaptBrandColor, StoryBook schemas
src/benchmarks/column-chart-example/  BenchmarkColumnChart example
src/benchmarks/ranking-chart-example/ BenchmarkRankingChart example
src/benchmarks/<slug>/        a real benchmark task
output/<slug>/                static build
```

## `BenchmarkRecord`

```ts
{
  name: string | ReactNode; // column: `\n` for two-line x labels
  score: number;
  line?: number;            // column overlay only
  color?: string;
  icon?: ReactNode;
  provider?: ReactNode;
  unranked?: boolean;       // column: after dashed separator; line does not connect
  highlighted?: true;       // gold text accent; bar fill unchanged
  error?: number;
  rank?: number;
}
```

## BenchmarkColumnChart

Vertical columns for comparing models. Icons and `color` are injected per record.

Minimal usage (from the official doc):

```tsx
import { BenchmarkColumnChart } from '@lobehub/charts';
import { Claude, OpenAI } from '@lobehub/icons';

<BenchmarkColumnChart
  data={[
    {
      color: Claude.colorPrimary,
      icon: <Claude.Avatar size={20} />,
      name: 'Claude Fable 5.1\n(max with fallback)',
      provider: 'Anthropic',
      score: 57,
    },
    {
      color: OpenAI.colorPrimary,
      icon: <OpenAI.Avatar size={20} />,
      name: 'GPT-6 Astra\n(max)',
      provider: 'OpenAI',
      score: 55,
    },
  ]}
  height={360}
/>
```

Poster defaults (`columnChartControls(theme.gold)` + example `column-chart-example`):

- `chartPadding: 16`, `height={page.chartHeight}` (420)
- `style={{ overflow: 'visible' }}` so rotated labels are not clipped
- Line overlay: set `line` on records; `showLine` / `showLineLabel` / `showLegend` on; `lineColor` defaults to `theme.gold`
- `barName` / `lineName` / `unrankedLabel`: pass `false` or `''` to hide that legend item
- Unranked: `unranked: true` (e.g. Step*) sits after a dashed separator
- Highlight: `highlighted: true` + `highlightColor` (default `theme.gold`)
- Accuracy: `accuracyFormatter`, `error`, `showErrorBars`
- Axis: `showXAxis` / `showYAxis` / `showRank` off; `labelAngle: -66`; `sortOrder: 'none'`

```tsx
const { page, store } = usePoster(themeMode, onThemeSwitch, {
  title, subtitle, footerNote, footerStep, footerMeta,
});
const { sortOrder, ...chartProps } = useControls(
  'Chart',
  columnChartControls(theme.gold),
  { store },
);

<Poster page={page} store={store}>
  <BenchmarkColumnChart
    data={data}
    height={page.chartHeight}
    sortOrder={sortOrder}
    style={{ overflow: 'visible' }}
    valueFormatter={(v) => v.toFixed(1)}
    {...chartProps}
  />
</Poster>
```

## BenchmarkRankingChart

Horizontal leaderboard. Same record shape, no `line` series.

Minimal usage (from the official doc):

```tsx
import { BenchmarkRankingChart } from '@lobehub/charts';
import { Gemini, OpenAI } from '@lobehub/icons';

<BenchmarkRankingChart
  data={[
    {
      color: Gemini.colorPrimary,
      icon: <Gemini.Avatar size={22} />,
      name: 'Gemini 3.8',
      provider: 'Google',
      score: 82.6,
    },
    {
      color: OpenAI.colorPrimary,
      icon: <OpenAI.Avatar size={22} />,
      name: 'GPT-6 Pro',
      provider: 'OpenAI',
      score: 73.9,
    },
  ]}
  labelWidth={280}
/>
```

Poster defaults (`rankingChartControls()` + example `ranking-chart-example`):

- `chartPadding: 48`, `autoChartHeight: true` — **do not pass `height`**
- Omit `labelWidth` to size the left column to the longest name; pass it to cap width
- `showRank` / `showYAxis` / `showValueLabel` on; `showXAxis` / `showErrorBars` off
- `sortOrder: 'descending'`, `rowHeight: 40`, `barSize: 24`
- Highlight with `highlighted: true` (name / provider / score accent, not bar fill)
- Accuracy: `accuracyFormatter`, `error`, `showErrorBars`
- Do not add Step* / unranked rows unless the user asks
- Single-line `name` + `provider` (no `\n`)

```tsx
const { page, store } = usePoster(themeMode, onThemeSwitch, {
  title, subtitle, footerNote, footerStep, footerMeta,
  autoChartHeight: true,
  chartPadding: 48,
});
const { sortOrder, ...chartProps } = useControls(
  'Chart',
  { ...rankingChartControls(), highlightColor: theme.gold },
  { store },
);

<Poster page={page} store={store}>
  <BenchmarkRankingChart
    data={data}
    sortOrder={sortOrder}
    style={{ overflow: 'visible' }}
    valueFormatter={(v) => v.toFixed(1)}
    {...chartProps}
  />
</Poster>
```

Call `usePoster` before Chart `useControls`. Empty footer strings are omitted.

## Build

```bash
pnpm build:bench column-chart-example
pnpm build:bench ranking-chart-example
pnpm build:bench <slug>
```

Writes `output/<slug>/` with `base: './'`.
