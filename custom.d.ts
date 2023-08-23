type PortfolioType = {
  id: number;
  title: string;
  description: string;
  url?: string | null | undefined;
  repoUrl?: string | null | undefined;
  image: string;
  category: string[];
  date: string;
};

export type { PortfolioType };
