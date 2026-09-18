import type { BenchmarkRecord } from '@lobehub/charts';
import { Claude, DeepSeek, Gemini, Grok, Meta, Minimax, OpenAI, Qwen } from '@lobehub/icons';
import { useTheme } from 'antd-style';
import { useMemo } from 'react';
import { adaptBrandColor } from '../../template/index.ts';

export const useRankingData = () => {
  const theme = useTheme();

  return useMemo<BenchmarkRecord[]>(
    () => [
      {
        color: adaptBrandColor(Claude.colorPrimary, theme.isDarkMode),
        icon: <Claude.Avatar size={20} />,
        name: 'Claude Fable 5.1',
        provider: 'Anthropic · max with fallback',
        score: 86.7,
      },
      {
        color: adaptBrandColor(OpenAI.colorPrimary, theme.isDarkMode),
        icon: <OpenAI.Avatar size={20} />,
        name: 'GPT-6 Astra',
        provider: 'OpenAI · max',
        score: 80,
      },
      {
        color: '#3186FF',
        icon: <Gemini.Avatar size={20} />,
        name: 'Gemini 3.1 Pro Preview',
        provider: 'Google',
        score: 75.6,
      },
      {
        color: adaptBrandColor(Grok.colorPrimary, theme.isDarkMode),
        icon: <Grok.Avatar size={20} />,
        name: 'Grok 5 Fast',
        provider: 'xAI',
        score: 73.3,
      },
      {
        color: adaptBrandColor(Qwen.colorPrimary, theme.isDarkMode),
        icon: <Qwen.Avatar size={20} />,
        name: 'Qwen3.8 2.4T A95B',
        provider: 'Alibaba Cloud',
        score: 72.2,
      },
      {
        color: adaptBrandColor(DeepSeek.colorPrimary, theme.isDarkMode),
        icon: <DeepSeek.Avatar size={20} />,
        name: 'DeepSeek V4.1 Flash',
        provider: 'DeepSeek · max',
        score: 70,
      },
      {
        color: adaptBrandColor(Meta.colorPrimary, theme.isDarkMode),
        icon: <Meta.Avatar size={20} />,
        name: 'Llama 5.1 70B',
        provider: 'Meta',
        score: 64.4,
      },
      {
        color: adaptBrandColor(Minimax.colorPrimary, theme.isDarkMode),
        icon: <Minimax.Avatar size={20} />,
        name: 'MiniMax M3',
        provider: 'MiniMax',
        score: 55.6,
      },
    ],
    [theme.isDarkMode],
  );
};
