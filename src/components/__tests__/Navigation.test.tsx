import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "../Navigation";

describe("Navigation", () => {
  it("renders the navigation links", () => {
    render(
      <Navigation>
        <div>Test Child Content</div>
      </Navigation>
    );
    const homeLink = screen.getByLabelText("Home");
    const blogLink = screen.getByText("Blog");
    const portfolioLink = screen.getByText("Portfolio");

    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(portfolioLink).toBeInTheDocument();
  });

  it("renders the child content", () => {
    render(
      <Navigation>
        <div>Test Child Content</div>
      </Navigation>
    );
    const childContent = screen.getByText("Test Child Content");

    expect(childContent).toBeInTheDocument();
  });

  // Update links when we have the pages
  it("renders the navigation links with the correct href", () => {
    render(
      <Navigation>
        <div>Test Child Content</div>
      </Navigation>
    );
    const homeLink = screen.getByLabelText("Home");
    const blogLink = screen.getByText("Blog");
    const portfolioLink = screen.getByText("Portfolio");

    expect(homeLink.getAttribute("href")).toBe("/");
    expect(blogLink.getAttribute("href")).toBe("/blog");
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
  });
});
