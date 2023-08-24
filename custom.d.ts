type PortfolioType = {
  id: number;
  title: string;
  description: string;
  url?: string | null | undefined;
  repo_url?: string | null | undefined;
  image: string;
  category: string[];
  created_at: Date;
  updated_at: Date;
};

export type { PortfolioType };
