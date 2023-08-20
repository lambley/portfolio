import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
}

type PortfolioType = {
  id: number;
  title: string;
  description: string;
  url?: string;
  repoUrl?: string;
  image: string;
  categories: string[];
  date: string;
}

export type { PortfolioType };
