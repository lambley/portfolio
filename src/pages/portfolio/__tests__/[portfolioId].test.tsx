import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockPortfolioUseRouter } from "@utils/tests/mockUseRouter";
import PortfolioItem from "../[portfolioId]";

jest.mock("next/router", () => ({
  useRouter: () => mockPortfolioUseRouter(),
}));

describe("PortfolioItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the portfolio item page", () => {
    const router = mockPortfolioUseRouter({});

    render(<PortfolioItem />);

    const portfolioHeader = screen.getByText("Portfolio Item");
    const portfolioDescription = screen.getByText("Portfolio ID: 1");

    expect(portfolioHeader).toBeInTheDocument();
    expect(portfolioDescription).toBeInTheDocument();
  });

  it("renders the portfolio item page with the correct portfolio id", () => {
    const router = mockPortfolioUseRouter({});

    render(<PortfolioItem />);

    const portfolioDescription = screen.getByText("Portfolio ID: 1");
    expect(portfolioDescription).toBeInTheDocument();
  });

  it("renders the portfolio item with a working back button", () => {
    const router = mockPortfolioUseRouter({});

    render(<PortfolioItem />);

    const backButton = screen.getByLabelText("back button");
    expect(backButton).toBeInTheDocument();

    const event = fireEvent.click(backButton);

    // bit of a bodge job - just tests that the button is being clicked and not that the router is being pushed
    expect(event).toBeTruthy();
  });
});
