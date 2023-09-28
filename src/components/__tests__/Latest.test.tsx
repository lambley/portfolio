import React from "react";
import Latest from "../Latest";
import { render, screen } from "@testing-library/react";
import { mockPortfolio, mockBlog } from "@/utils/constants/mockPortfolio";

describe("Latest", () => {
  it("renders correctly", () => {
    render(<Latest />);
    expect(screen.getByText("Latest")).toBeInTheDocument();
  });

  it("renders the latest blog post", () => {});

  it("renders the latest project", () => {});
});
