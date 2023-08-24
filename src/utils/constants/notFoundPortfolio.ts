import { PortfolioType } from "../../../custom";

let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const notFoundPortfolio: PortfolioType = {
  id: 0,
  title: "Not Found",
  description: "Not Found",
  url: "Not Found",
  repo_url: "Not Found",
  image: "404",
  category: ["Not Found"],
  created_at: yesterday,
  updated_at: today,
};

export default notFoundPortfolio;
