import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "../Header/Navigation";
import { type } from "os";

const NavigationProps = {
  theme: "light",
  onToggle: jest.fn(),
  children: <div>Test Child Content</div>,
};

describe("Navigation", () => {
  it("renders the navigation links", () => {
    render(<Navigation {...NavigationProps} />);
    const homeLink = screen.getByLabelText("Home");
    const blogLink = screen.getByText("Blog");
    const portfolioLink = screen.getByText("Portfolio");

    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(portfolioLink).toBeInTheDocument();
  });

  it("renders the child content", () => {
    render(<Navigation {...NavigationProps} />);
    const childContent = screen.getByText("Test Child Content");

    expect(childContent).toBeInTheDocument();
  });

  // Update links when we have the pages
  it("renders the navigation links with the correct href", () => {
    render(<Navigation {...NavigationProps} />);
    const homeLink = screen.getByLabelText("Home");
    const blogLink = screen.getByText("Blog");
    const portfolioLink = screen.getByText("Portfolio");

    expect(homeLink.getAttribute("href")).toBe("/");
    expect(blogLink.getAttribute("href")).toBe("/blog");
    expect(portfolioLink.getAttribute("href")).toBe("/portfolio");
  });

  it("renders the back to top button", () => {
    render(<Navigation {...NavigationProps} />);
    const backToTopButton = screen.getByLabelText("Back to top");
    expect(backToTopButton).toBeInTheDocument();

    // check that the button is hidden on smaller screens
    window.innerWidth = 700;
    expect(backToTopButton).toHaveClass("hide");
  });
});
