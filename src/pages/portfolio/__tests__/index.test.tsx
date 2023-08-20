import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../index";

describe("Portfolio", () => {
  const mockPortfolio = [
    {
      id: 1,
      title: "test title",
      description: "test description",
      image: "test image",
      url: "test url",
      repoUrl: "test repo url",
      categories: ["test category"],
      date: "test date",
    },
    {
      id: 2,
      title: "test title 2",
      description: "test description 2",
      image: "test image 2",
      url: "test url 2",
      repoUrl: "test repo url 2",
      categories: ["test category 2"],
      date: "test date 2",
    },
  ];

  it("renders the portfolio page", () => {
    render(<Portfolio feed={mockPortfolio} />);
    const portfolioHeader = screen.getByText("Portfolio List");

    expect(portfolioHeader).toBeInTheDocument();
  });

  it("renders the portfolio list", () => {
    render(<Portfolio feed={mockPortfolio} />);
    const portfolioItems = screen.getAllByLabelText("portfolio-item");

    expect(portfolioItems).toHaveLength(2);
  });

  it("renders the portfolio item with the correct dynamic link", () => {
    render(<Portfolio feed={mockPortfolio} />);
    const portfolioItemLink = screen.getAllByLabelText("portfolio-item-link");

    portfolioItemLink.forEach((link, index) => {
      expect(link).toHaveAttribute(
        "href",
        `/portfolio/${mockPortfolio[index].id}`
      );
    });
  });
});
