import { useEffect } from 'react';
import type { ThemeMode } from 'antd-style';
import { getActiveBenchmark } from './benchmarks/registry.ts';

interface AppProps {
  onThemeSwitch: (themeMode: ThemeMode) => void;
  themeMode: ThemeMode;
}

export default function App({ onThemeSwitch, themeMode }: AppProps) {
  const entry = getActiveBenchmark();
  const Page = entry.Page;

  useEffect(() => {
    document.title = entry.title;
  }, [entry.title]);

  return <Page onThemeSwitch={onThemeSwitch} themeMode={themeMode} />;
}
