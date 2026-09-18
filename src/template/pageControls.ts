import { useControls, useCreateStore } from '@lobehub/ui/storybook';
import type { ThemeMode } from 'antd-style';
import type { PageCopy } from './types.ts';

export type LevaStore = ReturnType<typeof useCreateStore>;

export interface PageControlDefaults extends PageCopy {
  autoChartHeight: boolean;
  chartHeight: number;
  chartPadding: number;
  gap: number;
  headerPadding: number;
  logoHeight: number;
  paddingTop: number;
  showFooter: boolean;
  showLogo: boolean;
  showSubtitle: boolean;
  showTitle: boolean;
  titleSize: number;
}

export const defaultPageControls: PageControlDefaults = {
  autoChartHeight: false,
  chartHeight: 420,
  chartPadding: 16,
  footerMeta: '',
  footerNote: '',
  footerStep: '',
  gap: 28,
  headerPadding: 48,
  logoHeight: 36,
  paddingTop: 48,
  showFooter: true,
  showLogo: true,
  showSubtitle: true,
  showTitle: true,
  subtitle: '',
  title: '',
  titleSize: 32,
};

export const usePageControls = (
  store: LevaStore,
  themeMode: ThemeMode,
  defaults: PageControlDefaults,
) =>
  useControls(
    'Page',
    {
      themeMode: {
        options: ['light', 'dark', 'auto'] as const,
        value: themeMode,
      },
      showLogo: defaults.showLogo,
      logoHeight: {
        max: 72,
        min: 16,
        step: 1,
        value: defaults.logoHeight,
      },
      showTitle: defaults.showTitle,
      title: defaults.title,
      titleSize: {
        max: 56,
        min: 16,
        step: 1,
        value: defaults.titleSize,
      },
      showSubtitle: defaults.showSubtitle,
      subtitle: {
        rows: 3,
        value: defaults.subtitle,
      },
      headerPadding: {
        max: 96,
        min: 0,
        step: 4,
        value: defaults.headerPadding,
      },
      paddingTop: {
        max: 96,
        min: 0,
        step: 4,
        value: defaults.paddingTop,
      },
      chartPadding: {
        max: 96,
        min: 0,
        step: 4,
        value: defaults.chartPadding,
      },
      gap: {
        max: 64,
        min: 0,
        step: 2,
        value: defaults.gap,
      },
      ...(defaults.autoChartHeight
        ? {}
        : {
            chartHeight: {
              max: 800,
              min: 200,
              step: 10,
              value: defaults.chartHeight,
            },
          }),
      showFooter: defaults.showFooter,
      footerNote: {
        rows: 2,
        value: defaults.footerNote,
      },
      footerStep: {
        rows: 2,
        value: defaults.footerStep,
      },
      footerMeta: {
        rows: 2,
        value: defaults.footerMeta,
      },
    },
    { store },
  );
