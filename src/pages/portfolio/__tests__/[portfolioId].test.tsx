import React from "react";
import { render, screen } from "@testing-library/react";
import mockUseRouter from "@utils/tests/mockUseRouter";
import PortfolioItem from "../[portfolioId]";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

describe("PortfolioItem", () => {
  it("renders the portfolio item page", () => {
    const router = mockUseRouter({ query: { portfolioId: "123" } });
    render(<PortfolioItem />);
    const portfolioHeader = screen.getByText("Portfolio Item");
    const portfolioDescription = screen.getByText("Portfolio ID:");
    expect(portfolioHeader).toBeInTheDocument();
    expect(portfolioDescription).toBeInTheDocument();
  });

  it("renders the portfolio item page with the correct portfolio id", () => {});
});
