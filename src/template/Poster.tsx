import { Flexbox, Text } from '@lobehub/ui';
import { StoryBook, useCreateStore } from '@lobehub/ui/storybook';
import { useTheme, type ThemeMode } from 'antd-style';
import { type ReactNode, useEffect } from 'react';
import Logo from './Logo.tsx';
import {
  defaultPageControls,
  usePageControls,
  type LevaStore,
  type PageControlDefaults,
} from './pageControls.ts';

export type PosterPageState = PageControlDefaults & { themeMode: ThemeMode };

export function usePoster(
  themeMode: ThemeMode,
  onThemeSwitch: (themeMode: ThemeMode) => void,
  page?: Partial<PageControlDefaults>,
) {
  const store = useCreateStore();
  const defaults = { ...defaultPageControls, ...page };
  const state = usePageControls(store, themeMode, defaults) as PosterPageState;

  useEffect(() => {
    onThemeSwitch(state.themeMode);
  }, [onThemeSwitch, state.themeMode]);

  return { page: state, store };
}

interface PosterProps {
  children: ReactNode;
  page: PosterPageState;
  store: LevaStore;
}

export default function Poster({ children, page, store }: PosterProps) {
  const theme = useTheme();
  const {
    chartPadding,
    footerMeta,
    footerNote,
    footerStep,
    gap,
    headerPadding,
    logoHeight,
    paddingTop,
    showFooter,
    showLogo,
    showSubtitle,
    showTitle,
    subtitle,
    title,
    titleSize,
  } = page;

  return (
    <StoryBook className="lobe-bench-storybook" levaStore={store} noPadding>
      <Flexbox
        direction="vertical"
        gap={gap}
        style={{
          background: theme.colorBgContainer,
          boxSizing: 'border-box',
          minHeight: '100%',
          paddingBottom: paddingTop,
          paddingTop,
        }}
        width="100%"
      >
        {showLogo || showTitle || showSubtitle ? (
          <Flexbox
            align="flex-start"
            horizontal
            justify="space-between"
            style={{
              boxSizing: 'border-box',
              paddingInline: headerPadding,
            }}
            width="100%"
          >
            {showTitle || showSubtitle ? (
              <Flexbox direction="vertical" gap={4} style={{ flex: 1, minWidth: 0 }}>
                {showTitle ? (
                  <Text
                    as="h1"
                    fontSize={titleSize}
                    style={{ letterSpacing: '-0.03em', margin: 0 }}
                    weight={700}
                  >
                    {title}
                  </Text>
                ) : null}
                {showSubtitle ? <Text type="secondary">{subtitle}</Text> : null}
              </Flexbox>
            ) : (
              <span />
            )}
            {showLogo ? (
              <Flexbox flex="none">
                <Logo height={logoHeight} />
              </Flexbox>
            ) : null}
          </Flexbox>
        ) : null}

        <Flexbox direction="vertical" width="100%">
          <Flexbox
            style={{
              boxSizing: 'border-box',
              paddingBottom: showFooter ? 24 : chartPadding,
              paddingInline: chartPadding,
              paddingTop: 0,
            }}
            width="100%"
          >
            {children}
          </Flexbox>

          {showFooter ? (
            <Flexbox
              direction="vertical"
              gap={8}
              style={{
                borderTop: `1px solid ${theme.colorBorderSecondary}`,
                boxSizing: 'border-box',
                paddingInline: headerPadding,
                paddingTop: 16,
              }}
              width="100%"
            >
              {footerNote ? (
                <Text fontSize={13} type="secondary">
                  {footerNote}
                </Text>
              ) : null}
              {footerStep ? (
                <Text fontSize={13} type="secondary">
                  {footerStep}
                </Text>
              ) : null}
              {footerMeta ? (
                <Text fontSize={13} type="secondary">
                  {footerMeta}
                </Text>
              ) : null}
            </Flexbox>
          ) : null}
        </Flexbox>
      </Flexbox>
    </StoryBook>
  );
}
