import { PortfolioType } from "../../../custom";

const notFoundPortfolio: PortfolioType = {
  id: 0,
  title: "Not Found",
  description: "Not Found",
  url: "Not Found",
  repo_url: "Not Found",
  image: "404",
  category: ["Not Found"],
};

const notFoundBlog = {
  id: 0,
  title: "Not Found",
  content: "Not Found",
  image: "404",
  meta_title: "Not Found",
  meta_description: "Not Found",
  status: "Not Found",
  tags: ["Not Found"],
};

export { notFoundPortfolio, notFoundBlog };
