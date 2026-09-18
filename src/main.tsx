import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, ThemeProvider } from '@lobehub/ui';
import type { ThemeMode } from 'antd-style';
import { motion } from 'motion/react';
import App from './App.tsx';
import './index.css';

function Root() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  return (
    <ConfigProvider motion={motion}>
      <ThemeProvider
        onThemeModeChange={setThemeMode}
        style={{ height: '100%', minHeight: '100%' }}
        themeMode={themeMode}
      >
        <App onThemeSwitch={setThemeMode} themeMode={themeMode} />
      </ThemeProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
