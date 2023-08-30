import React from "react";
import { render, screen } from "@testing-library/react";
import Blog from "../index";
import { mockBlog, mockBlogList } from "@/utils/constants/mockPortfolio";

describe("Blog", () => {
  const mockFeed = mockBlogList;

  it("should render the blog page", () => {
    render(<Blog feed={mockFeed} />);
    const blogHeader = screen.getByText("Blog");

    expect(blogHeader).toBeInTheDocument();
  });

  it("should render the blog list", () => {
    render(<Blog feed={mockFeed} />);
    const blogItems = screen.getAllByLabelText("blog-item");

    expect(blogItems).toHaveLength(2);
  });
});
