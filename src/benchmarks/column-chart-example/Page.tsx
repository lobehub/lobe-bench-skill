import { BenchmarkColumnChart } from '@lobehub/charts';
import { useControls } from '@lobehub/ui/storybook';
import { useTheme } from 'antd-style';
import {
  columnChartControls,
  Poster,
  usePoster,
  type BenchmarkPageProps,
} from '../../template/index.ts';
import { useLeaderboardData } from './data.tsx';

export default function AgentLeaderboardPage({
  onThemeSwitch,
  themeMode,
}: BenchmarkPageProps) {
  const theme = useTheme();
  const data = useLeaderboardData();
  const { page, store } = usePoster(themeMode, onThemeSwitch, {
    footerMeta:
      'Retrospective benchmark · Historical results unchanged · Step evaluated Sep 17, 2026',
    footerNote:
      'Historical entries: bars = cases passing all 3 rounds / 30; line = passed runs / 90. All values are percentages.',
    footerStep:
      '* Step: 14/28 fully valid cases; 56/86 valid runs. 4 INVALID records excluded. Different release and scoring policy; no comparable rank.',
    subtitle:
      'Historical configurations + Step / Reviewed Judge verdicts · INTERNAL · SEP 18, 2026',
    title: 'Agent Model Leaderboard',
  });
  const { sortOrder, ...chartProps } = useControls(
    'Chart',
    columnChartControls(theme.gold),
    { store },
  );

  return (
    <Poster page={page} store={store}>
      <BenchmarkColumnChart
        data={data}
        height={page.chartHeight}
        sortOrder={sortOrder as 'ascending' | 'descending' | 'none'}
        style={{ overflow: 'visible' }}
        valueFormatter={(value) => value.toFixed(1)}
        {...chartProps}
      />
    </Poster>
  );
}
