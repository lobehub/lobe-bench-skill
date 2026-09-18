---
name: lobe-bench
description: Renders LobeBench leaderboard posters from a shared page template using BenchmarkColumnChart or BenchmarkRankingChart, then builds a static HTML file into output/. Use when the user asks for a new benchmark, leaderboard, ranking chart, LobeBench poster, or a static HTML export.
---

# LobeBench posters

Follow this skill whenever the user requests a new benchmark visualization.

## Stop: confirm variants first

Before creating files or running `build:bench`, confirm chart variants with the user **in Chinese**. Full script: [references/intake.md](references/intake.md).

Skip items the user already stated. Prefer AskQuestion. Recap the answers, then code.

Must cover:

1. **先问图表，并把两个 example 给用户看**（`/?b=column-chart-example`、`/?b=ranking-chart-example`）。未选定前不要问变体。
2. 误差棒 error bars
3. 高亮 highlight（哪些模型）
4. 排序 none / descending / ascending
5. **仅 Column：** 折线叠加 line overlay；未排名 unranked（如 Step*）
6. **仅 Ranking：** 是否显示 `#1` 名次。不要问折线；不要默认加 unranked

Poster defaults if they accept the recommendation: Column = 有折线、有未排名、无误差棒、无高亮、`sortOrder: none`. Ranking = 无折线、无未排名、无误差棒、有名次、`sortOrder: descending`.

These questions are the **baseline** customization. If the user brings extra copy, extra series, annotations, a different data shape, or a bigger visual change, do it — keep the poster frame, not the example’s internals.

## Baseline vs larger changes

**Keep stable (the frame):** X-style poster, not a website. Shared `src/template` shell: `paddingTop` → header (title/subtitle left, Logo right) → chart → 24px → divider → footer. `@lobehub/ui/storybook` only. Static `output/<slug>/`. Brand is LobeBench.

**Allowed to change a lot:** data, titles, footnotes, which models appear, chart props, formatters, icons, highlight/unranked/line/error, extra StoryBook controls, extra footer lines, per-benchmark `Page.tsx` / `data.tsx` structure. If they need a new shared slot (e.g. a caption under the title, a second chart), **extend** `src/template` with an optional region — do not fork a second layout or wrap the poster in nested cards.

Do not refuse a large content/visual request just because the examples are simpler. Copy an example as the starting point, then rewrite the inside.

## Deliverable

Each task ends with a **static HTML build** at:

```
output/<slug>/index.html
```

Do not stop at the Vite dev page. Run `pnpm build:bench <slug>` and confirm `output/<slug>/` exists.

## Page structure (do not invent chrome)

Reuse `src/template`. Do not add website chrome, nested cards, or a second layout.

```
paddingTop                         ← never 0; default 48
┌ header                           headerPadding L/R only (not top)
│  title + subtitle (left, tight)
│  Logo (right, same row, top-aligned)
│ gap
├ chart                            chartPadding L/R
│                                  24px below chart before the line
├ 1px theme divider
│                                  16px below the line
└ footer notes                     headerPadding L/R
paddingBottom (= paddingTop)
```

Controls: `@lobehub/ui/storybook` only (`StoryBook`, `useControls`, `useCreateStore`). Never import `leva`.

## Chart choice

Official docs (read [references/charts.md](references/charts.md) before coding):

- [BenchmarkColumnChart](https://github.com/lobehub/lobe-charts/blob/master/src/BenchmarkColumnChart/index.mdx)
- [BenchmarkRankingChart](https://github.com/lobehub/lobe-charts/blob/master/src/BenchmarkRankingChart/index.mdx)

| Use | Component | Example |
|-----|-----------|---------|
| Vertical bars, overlay line, unranked group | `BenchmarkColumnChart` | `column-chart-example` |
| Horizontal ranked list, rank-first | `BenchmarkRankingChart` | `ranking-chart-example` |

Unspecified: Pass³/Pass¹ line or unranked separator → column. Long ranked table → ranking.

## Layout lessons

- **Header padding is L/R only.** Top inset is `paddingTop`, not `headerPadding`.
- **Title left, Logo right, `align="flex-start"`.** Zero `h1` margin; title/subtitle `gap={4}`; title `letterSpacing: '-0.03em'`.
- **Column `chartPadding` default 16.** Pass `height={page.chartHeight}` (default 420). Set `style={{ overflow: 'visible' }}`.
- **Ranking `chartPadding` default 48.** Set `autoChartHeight: true`. Do **not** pass `height`.
- **Ranking does not include Step* / unranked rows** unless the user asks.
- **Footer divider must not touch the chart.** Poster keeps 24px above the line.
- Icons and brand colors come from the consumer (`@lobehub/icons`). Use `adaptBrandColor` for near-black / near-white brands.
- Call `usePoster` **before** Chart `useControls` so the Page folder stays on top.

## Examples

Copy the matching chart-type folder as a starting point. Keep the poster frame; the inside can change substantially.

| Slug | Chart | Source | Output | Dev |
|------|-------|--------|--------|-----|
| `column-chart-example` | `BenchmarkColumnChart` | `src/benchmarks/column-chart-example/` | `output/column-chart-example/` | `/?b=column-chart-example` |
| `ranking-chart-example` | `BenchmarkRankingChart` | `src/benchmarks/ranking-chart-example/` | `output/ranking-chart-example/` | `/?b=ranking-chart-example` |

## New benchmark checklist

1. Slug: lowercase kebab-case. Chart-type examples stay `column-chart-example` / `ranking-chart-example`; real tasks use a content slug (e.g. `swe-bench`).
2. Create `src/benchmarks/<slug>/` with `meta.ts`, `data.tsx`, `Page.tsx`.
3. Registry auto-loads those files. Do not edit a manual list.
4. Dev: `pnpm dev` then `/?b=<slug>`.
5. Ship: `pnpm build:bench <slug>`.
6. Verify poster, dark/light, footer gap, no chart scrollbar.

pnpm only. Product name is LobeBench, never “Lobe Eval”. Do not commit unless asked.

## Extra detail

- Pre-flight questions (Chinese): [references/intake.md](references/intake.md)
- Chart APIs and record shape: [references/charts.md](references/charts.md)
