import type { ComponentType } from 'react';
import type { ThemeMode } from 'antd-style';

export type ChartKind = 'column' | 'ranking';

export interface BenchmarkMeta {
  chart: ChartKind;
  slug: string;
  title: string;
}

export interface BenchmarkPageProps {
  onThemeSwitch: (themeMode: ThemeMode) => void;
  themeMode: ThemeMode;
}

export interface BenchmarkEntry extends BenchmarkMeta {
  Page: ComponentType<BenchmarkPageProps>;
}

export interface PageCopy {
  footerMeta: string;
  footerNote: string;
  footerStep: string;
  subtitle: string;
  title: string;
}
