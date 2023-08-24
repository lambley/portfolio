import { PortfolioType } from "../../../custom";

let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const mockPortfolio = {
  id: 1,
  title: "Test Portfolio",
  description: "Test description",
  url: "https://www.example.com",
  repoUrl: "https://www.github.com/example",
  image: "test.jpg",
  category: ["Category 1", "Category 2"],
  createdAt: yesterday,
  updatedAt: today,
};

export { mockPortfolio };

const mockPortfolioList = [
  {
    id: 1,
    title: "Test Portfolio",
    description: "Test description",
    url: "https://www.example.com",
    repoUrl: "https://www.github.com/example",
    image: "test.jpg",
    category: ["Category 1", "Category 2"],
    createdAt: yesterday,
    updatedAt: today,
  },
  {
    id: 2,
    title: "Test Portfolio 2",
    description: "Test description 2",
    url: "https://www.example.com",
    repoUrl: "https://www.github.com/example",
    image: "test.jpg",
    category: ["Category 1", "Category 2"],
    createdAt: yesterday,
    updatedAt: today,
  },
];

export { mockPortfolioList };
