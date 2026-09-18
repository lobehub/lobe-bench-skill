import { BenchmarkRankingChart } from '@lobehub/charts';
import { useControls } from '@lobehub/ui/storybook';
import { useTheme } from 'antd-style';
import {
  Poster,
  rankingChartControls,
  usePoster,
  type BenchmarkPageProps,
} from '../../template/index.ts';
import { useRankingData } from './data.tsx';

export default function AgentRankingPage({
  onThemeSwitch,
  themeMode,
}: BenchmarkPageProps) {
  const theme = useTheme();
  const data = useRankingData();
  const { page, store } = usePoster(themeMode, onThemeSwitch, {
    autoChartHeight: true,
    chartPadding: 48,
    footerMeta: 'Retrospective benchmark · Historical results unchanged · SEP 18, 2026',
    footerNote:
      'Bars = cases passing all 3 rounds / 30. All values are percentages. Ranked by Pass³.',
    footerStep: '',
    subtitle: 'Reviewed Judge verdicts · INTERNAL · SEP 18, 2026',
    title: 'Agent Model Ranking',
  });
  const { sortOrder, ...chartProps } = useControls(
    'Chart',
    {
      ...rankingChartControls(),
      highlightColor: theme.gold,
    },
    { store },
  );

  return (
    <Poster page={page} store={store}>
      <BenchmarkRankingChart
        data={data}
        sortOrder={sortOrder as 'ascending' | 'descending' | 'none'}
        style={{ overflow: 'visible' }}
        valueFormatter={(value) => value.toFixed(1)}
        {...chartProps}
      />
    </Poster>
  );
}
