import { PortfolioType, BlogType } from "../../../custom";

let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const mockPortfolio: PortfolioType = {
  id: 1,
  title: "Test Portfolio",
  description: "Test description",
  url: "https://www.example.com",
  repo_url: "https://www.github.com/example",
  image: "test.jpg",
  category: ["Category 1", "Category 2"],
  created_at: yesterday,
  updated_at: today,
};

const mockPortfolioList: PortfolioType[] = [
  {
    id: 1,
    title: "Test Portfolio",
    description: "Test description",
    url: "https://www.example.com",
    repo_url: "https://www.github.com/example",
    image: "test.jpg",
    category: ["Category 1", "Category 2"],
    created_at: yesterday,
    updated_at: today,
  },
  {
    id: 2,
    title: "Test Portfolio 2",
    description: "Test description 2",
    url: "https://www.example.com",
    repo_url: "https://www.github.com/example",
    image: "test.jpg",
    category: ["Category 1", "Category 2"],
    created_at: yesterday,
    updated_at: today,
  },
];

const mockBlog: BlogType = {
  id: 1,
  title: "Test Blog",
  content: "Test content",
  image: "test",
  meta_title: "Test meta title",
  meta_description: "Test meta description",
  status: "published",
  tags: ["Tag 1", "Tag 2"],
};

const mockBlogList: BlogType[] = [
  {
    id: 1,
    title: "Test Blog",
    content: "Test content",
    image: "test",
    meta_title: "Test meta title",
    meta_description: "Test meta description",
    status: "published",
    tags: ["Tag 1", "Tag 2"],
  },
  {
    id: 2,
    title: "Test Blog 2",
    content: "Test content 2",
    image: "test",
    meta_title: "Test meta title",
    meta_description: "Test meta description",
    status: "published",
    tags: ["Tag 1", "Tag 2"],
  },
];

export { mockPortfolioList, mockPortfolio, mockBlogList, mockBlog };
