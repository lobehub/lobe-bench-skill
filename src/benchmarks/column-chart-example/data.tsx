import type { BenchmarkRecord } from '@lobehub/charts';
import { Claude, DeepSeek, Gemini, Grok, Meta, Minimax, OpenAI, Qwen } from '@lobehub/icons';
import { useTheme } from 'antd-style';
import { useMemo } from 'react';
import { adaptBrandColor } from '../../template/index.ts';

export const useLeaderboardData = () => {
  const theme = useTheme();

  return useMemo<BenchmarkRecord[]>(
    () => [
      {
        color: adaptBrandColor(Claude.colorPrimary, theme.isDarkMode),
        icon: <Claude.Avatar size={20} />,
        line: 91.1,
        name: 'Claude Fable 5.1\n(max with fallback)',
        provider: 'Anthropic',
        score: 86.7,
      },
      {
        color: adaptBrandColor(OpenAI.colorPrimary, theme.isDarkMode),
        icon: <OpenAI.Avatar size={20} />,
        line: 90,
        name: 'GPT-6 Astra\n(max)',
        provider: 'OpenAI',
        score: 80,
      },
      {
        color: '#3186FF',
        icon: <Gemini.Avatar size={20} />,
        line: 87.8,
        name: 'Gemini 3.1 Pro\nPreview',
        provider: 'Google',
        score: 75.6,
      },
      {
        color: adaptBrandColor(Grok.colorPrimary, theme.isDarkMode),
        icon: <Grok.Avatar size={20} />,
        line: 86.7,
        name: 'Grok 5\nFast',
        provider: 'xAI',
        score: 73.3,
      },
      {
        color: adaptBrandColor(Qwen.colorPrimary, theme.isDarkMode),
        icon: <Qwen.Avatar size={20} />,
        line: 85.6,
        name: 'Qwen3.8\n2.4T A95B',
        provider: 'Alibaba Cloud',
        score: 72.2,
      },
      {
        color: adaptBrandColor(DeepSeek.colorPrimary, theme.isDarkMode),
        icon: <DeepSeek.Avatar size={20} />,
        line: 84.4,
        name: 'DeepSeek V4.1\nFlash (max)',
        provider: 'DeepSeek',
        score: 70,
      },
      {
        color: adaptBrandColor(Meta.colorPrimary, theme.isDarkMode),
        icon: <Meta.Avatar size={20} />,
        line: 81.1,
        name: 'Llama 5.1\n70B',
        provider: 'Meta',
        score: 64.4,
      },
      {
        color: adaptBrandColor(Minimax.colorPrimary, theme.isDarkMode),
        icon: <Minimax.Avatar size={20} />,
        line: 73.3,
        name: 'MiniMax\nM3',
        provider: 'MiniMax',
        score: 55.6,
      },
      {
        color: adaptBrandColor(OpenAI.colorPrimary, theme.isDarkMode),
        icon: <OpenAI.Avatar size={20} />,
        line: 82.2,
        name: 'Step*\nwater18-0910',
        provider: 'StepFun',
        score: 66.7,
        unranked: true,
      },
    ],
    [theme.isDarkMode],
  );
};
