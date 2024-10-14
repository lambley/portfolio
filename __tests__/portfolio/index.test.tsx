import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../../src/pages/portfolio/index";
import { mockPortfolioList } from "@/utils/constants/mockPortfolio";

describe("Portfolio", () => {
  it("renders the portfolio page", () => {
    render(<Portfolio feed={mockPortfolioList} />);
    const portfolioHeader = screen.getByText("My Projects");

    expect(portfolioHeader).toBeInTheDocument();
  });

  it("renders the portfolio list", () => {
    render(<Portfolio feed={mockPortfolioList} />);
    const portfolioItems = screen.getAllByLabelText("portfolio-item");

    expect(portfolioItems).toHaveLength(2);
  });

  it("renders the portfolio item with the correct dynamic link", () => {
    render(<Portfolio feed={mockPortfolioList} />);
    const portfolioItemLink = screen.getAllByLabelText("portfolio-item-link");

    portfolioItemLink.forEach((link, index) => {
      expect(link).toHaveAttribute(
        "href",
        `/portfolio/${mockPortfolioList[index].id}`
      );
    });
  });
});
