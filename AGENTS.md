# LobeBench

Static X-style posters for model leaderboards. Not a website: no chrome, nested cards, or extra layout.

Product name is **LobeBench**. Never write “Lobe Eval”.

## Commands

```bash
pnpm install
pnpm dev                          # http://localhost:5173/?b=<slug>
pnpm build:bench <slug>           # output/<slug>/index.html
```

pnpm only. Typecheck runs inside `build:bench`. Do not commit unless asked.

## Stack

Vite 8, React 19, TypeScript. UI: `@lobehub/ui` + `@lobehub/ui/storybook`. Charts: `@lobehub/charts` (`BenchmarkColumnChart`, `BenchmarkRankingChart`). Icons: `@lobehub/icons`. Theme: `ConfigProvider` + `ThemeProvider` in `src/main.tsx`. Vite `resolve.dedupe`: `react`, `react-dom`, `antd-style`.

## Layout

Reuse `src/template`. The poster frame stays stable; content and chart internals can change a lot when the user needs more than the example defaults. Do not invent a second website layout or nested cards. Extend the template with optional slots instead of forking.

```
paddingTop                         ← never 0; default 48
┌ header                           headerPadding L/R only
│  title + subtitle (left, gap 4)
│  Logo (right, same row, top-aligned)
│ gap
├ chart                            chartPadding L/R
│                                  24px below chart
├ 1px theme divider
│                                  16px below the line
└ footer notes                     headerPadding L/R
paddingBottom (= paddingTop)
```

- Title: `weight={700}`, `letterSpacing: '-0.03em'`, `margin: 0`.
- Controls: `@lobehub/ui/storybook` only. Never import `leva`.
- Column: `chartPadding` 16, `height={page.chartHeight}`. Ranking: `chartPadding` 48, `autoChartHeight`, no `height`.

## New posters

Follow [`.agents/skills/lobe-bench/SKILL.md`](.agents/skills/lobe-bench/SKILL.md). Ask variant questions first ([intake](.agents/skills/lobe-bench/references/intake.md)). Chart APIs: [`.agents/skills/lobe-bench/references/charts.md`](.agents/skills/lobe-bench/references/charts.md).

1. Add `src/benchmarks/<slug>/{meta.ts,data.tsx,Page.tsx}`. Registry auto-loads; do not edit a list.
2. Copy `column-chart-example` or `ranking-chart-example` as a start. Keep the frame; rewrite the inside if the brief is bigger than the baseline variants.
3. Ship with `pnpm build:bench <slug>`. Dev preview is not the deliverable.

## Agent files

| File | Role |
|------|------|
| `AGENTS.md` | Always-on briefing (this file). |
| `CLAUDE.md` | `@AGENTS.md` import for Claude Code. |
| `.agents/skills/<name>/SKILL.md` | Canonical [Agent Skills](https://agentskills.io/specification) packages. |

Cursor, Codex, and Copilot load `.agents/skills/` natively. `.claude/skills` and `.github/skills` are **symlinks** to that folder so Claude Code and GitHub Copilot still find them. Add new skills only under `.agents/skills/`. Do not copy skill files into tool-specific directories.
