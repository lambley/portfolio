type PortfolioType = {
  id: number;
  title: string;
  description: string;
  url?: string | null | undefined;
  repo_url?: string | null | undefined;
  image: string;
  category: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type { PortfolioType };
