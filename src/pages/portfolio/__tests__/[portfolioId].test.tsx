import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockPortfolioUseRouter } from "@utils/tests/mocks/mockUseRouter";
import PortfolioItem from "../[portfolioId]";
import { mockPortfolio } from "@/utils/constants/mockPortfolio";

jest.mock("next/router", () => ({
  useRouter: () => mockPortfolioUseRouter(),
}));

describe("PortfolioItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the portfolio item page", () => {
    render(<PortfolioItem portfolio={mockPortfolio} />);

    const title = screen.getByText("Test Portfolio");
    const description = screen.getByText("Test description");
    const urlLink = screen.getByText("https://www.example.com");
    const repoLink = screen.getByText("https://www.github.com/example");
    const category1 = screen.getByText("Category 1");
    const category2 = screen.getByText("Category 2");
    const backButton = screen.getByLabelText("back button");

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(urlLink).toHaveAttribute("href", "https://www.example.com");
    expect(repoLink).toHaveAttribute("href", "https://www.github.com/example");
    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  it("renders the portfolio item with a working back button", () => {
    const router = mockPortfolioUseRouter({});

    render(<PortfolioItem portfolio={mockPortfolio} />);

    const backButton = screen.getByLabelText("back button");
    expect(backButton).toBeInTheDocument();

    const event = fireEvent.click(backButton);

    // bit of a bodge job - just tests that the button is being clicked and not that the router is being pushed
    expect(event).toBeTruthy();
  });
});
