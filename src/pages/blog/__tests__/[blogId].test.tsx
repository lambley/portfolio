import React, { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockPortfolioUseRouter } from "@utils/tests/mockUseRouter";
import BlogItem from "../[blogId]";
import { mockBlog } from "@/utils/constants/mockPortfolio";

jest.mock("next/router", () => ({
  useRouter: () => mockPortfolioUseRouter(),
}));

describe("BlogItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the blog item page", () => {
    render(<BlogItem blog={mockBlog} />);

    const title = screen.getByText("Test Blog");
    const content = screen.getByText("Test content");
    const image = screen.getByAltText("Test Blog");
    const tags1 = screen.getByText("Tag 1");
    const tags2 = screen.getByText("Tag 2");
    const backButton = screen.getByLabelText("back button");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(tags1).toBeInTheDocument();
    expect(tags2).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });
});
