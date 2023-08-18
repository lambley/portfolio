import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../index";

describe("Portfolio", () => {
  it("renders the portfolio page", () => {
    render(<Portfolio />);
    const portfolioHeader = screen.getByText("Portfolio List");

    expect(portfolioHeader).toBeInTheDocument();
  });

  // add test for displaying portfolio items
  // add test for routing to portfolio item
});
