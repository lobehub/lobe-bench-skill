# 图表变体：执行前确认

未得到答案前**禁止**新建 benchmark、改数据、跑 `build:bench`。用户已经说清的项跳过，不要重复问。

优先用 **AskQuestion**（可多选的标 `allow_multiple`）。没有该工具时用中文逐条问。互不依赖的问题一次问完。

流程：

1. **先问图表，并把两个 example 给用户看。** 未选定前不要问误差棒等变体。
2. 再问该图对应的变体（见下）。折线 / 未排名只问 Column；Ranking 默认不问这两项。
3. 问完用三五行复述选择，等用户点头或改口后再写代码。
4. 按选择改 `data.tsx` 与 `usePoster` / `useControls` 默认值。需要新旋钮时加在现有 StoryBook（Page / Chart）里，不要另起 leva。

上面这些题是**最基础的定制**。用户还要加更多内容或做更大改动时：海报大框架（顶边距 → 标题+Logo → 图 → 分隔线 → 页脚）保持稳定，里面可以大改——数据、文案、系列、标注、格式、甚至扩展 template 的可选区域。不要因为 example 更简单就拒绝。

推荐默认 = 本仓库示例海报。用户没表态就用推荐项，但**仍须问出口**（除非用户已写明）。

变体问完后补一句（用户已把额外需求写清则跳过）：「除了这些，还有没有要加的内容或版式？」有的话在框架内做，不要另做一套页面。

## 共用

### 图表

**第一轮只问这个。** 把两个 example 亮出来再让用户选，不要和变体题捆在一起。

预览（dev server 已开则打开；否则给链接，需要时 `pnpm dev`）：

- 柱状对比：`/?b=column-chart-example` — `src/benchmarks/column-chart-example/`（竖柱 + 折线 + 未排名 Step*）
- 横向排名：`/?b=ranking-chart-example` — `src/benchmarks/ranking-chart-example/`（横条排行 + 名次）

有浏览器工具时打开这两页截图放进提问里。没有则写出上面的链接，并说明各是什么。

用哪种图？

| 选项 | 何时选 | Example |
|------|--------|---------|
| 柱状对比 `BenchmarkColumnChart` | 竖柱；Pass³/Pass¹ 折线、未排名分隔 | `column-chart-example` |
| 横向排名 `BenchmarkRankingChart` | 横条排行榜；长名单、名次优先 | `ranking-chart-example` |

未指定且有折线或 unranked → Column。未指定且是长排名表 → Ranking。仍要把 example 给用户看一眼。

### 误差棒

要不要误差棒（AccuracyBar 的 ±error）？

- 不要（推荐。`showErrorBars: false`，数据不写 `error`）
- 要（`showErrorBars: true`，每条有 `error`；可用 `accuracyFormatter`）

### 高亮

要不要高亮某些模型？（名字 / provider / 分数变金色，**柱色不变**）

- 不要（推荐）
- 要，高亮这些：____（对应记录 `highlighted: true`，`highlightColor` 用 `theme.gold`）

### 排序

- 保持数据顺序 `none`（Column 示例推荐）
- 按分数从高到低 `descending`（Ranking 示例推荐）
- 从低到高 `ascending`

## 仅 Column

### 折线叠加

要不要叠加折线（例如 Pass¹）？

- 要（推荐。数据写 `line`，`showLine` / `showLineLabel` / `showLegend` 开）
- 不要（不要 `line` 字段，`showLine: false`）

若要折线，图例文案（可空或 `false` 隐藏该项）：

- 柱名 `barName`（示例：`All 3 rounds passed / Pass³`）
- 折线名 `lineName`（示例：`Overall pass rate / Pass¹`）

### 未排名

要不要未排名分组（虚线后，折线不连过去，如 Step*）？

- 要（Column 示例推荐。那些条目 `unranked: true`）
- 不要

若要：分隔旁标注 `unrankedLabel` 用什么？哪些条目未排名？

## 仅 Ranking

不要问折线。不要默认加 Step* / `unranked`，除非用户主动要。

### 名次

左侧要不要 `#1` `#2`？

- 要（推荐。`showRank: true`）
- 不要

## AskQuestion 草稿

图表未知时**先发这一组（不要夹变体题）**：

- id `chart`：用哪种图？`column` 柱状对比（见 `column-chart-example`） / `ranking` 横向排名（见 `ranking-chart-example`）

选定后再问变体：

- id `errorBars`：误差棒？`off` 不要（推荐） / `on` 要，数据带 error
- id `highlight`：高亮？`off` 不要（推荐） / `on` 要（下一条消息问名单）
- id `sort`：排序？`none` 保持数据顺序 / `descending` 高到低 / `ascending` 低到高

Column 追加：

- id `line`：折线叠加？`on` 要（推荐） / `off` 不要
- id `unranked`：未排名分组？`on` 要（推荐） / `off` 不要

Ranking 追加：

- id `showRank`：显示名次？`on` 要（推荐） / `off` 不要

`highlight=on` 或 `unranked=on` 后再问名单 / 标注文案，不要和是非题挤在同一轮里猜。

## 落到代码

| 选择 | 实现 |
|------|------|
| 误差棒开 | 记录 `error`；`showErrorBars: true` |
| 高亮 | 那些记录 `highlighted: true` |
| Column 折线 | 记录 `line`；`showLine` 等为 true |
| Column 无折线 | 无 `line`；`showLine: false` |
| Column 未排名 | `unranked: true` + `unrankedLabel` |
| Ranking | `autoChartHeight`、`chartPadding: 48`、不传 `height`、无 Step* |
