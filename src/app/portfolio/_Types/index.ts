export const ThemeTypeArray = ['igHelper', 'heyVote'] as const;

export type PortfolioTheme = (typeof ThemeTypeArray)[number];

export const PortfolioTheme_Hangul: Record<PortfolioTheme, string> = {
  igHelper: '인강헬퍼',
  heyVote: 'hey Vote!',
};
