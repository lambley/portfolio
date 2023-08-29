type PortfolioType = {
  id: number;
  title: string;
  description: string;
  url?: string | null | undefined;
  repo_url?: string | null | undefined;
  image: string;
  category: string[];
  created_at?: Date;
  updated_at?: Date;
};

type BlogType = {
  id: number;
  title: string;
  content: string;
  image: string;
  meta_title: string;
  meta_description: string;
  status: string;
  tags: string[];
  created_at?: Date;
  updated_at?: Date;
}

export type { PortfolioType, BlogType };
