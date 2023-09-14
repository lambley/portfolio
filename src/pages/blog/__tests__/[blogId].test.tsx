import React, { ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockPortfolioUseRouter } from "@utils/tests/mocks/mockUseRouter";
import BlogItem from "../[blogId]";
import { mockBlog } from "@/utils/constants/mockPortfolio";
import { mock } from "node:test";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

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

  it("renders the blog item page with the correct meta tags", async () => {
    render(<BlogItem blog={mockBlog} />, {
      container: document.head,
    });

    await waitFor(() => {
      const title = document.title;
      expect(title).toBe(mockBlog.meta_title);

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      expect(metaDescription?.getAttribute("content")).toBe(
        mockBlog.meta_description
      );

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute("content")).toBe(mockBlog.meta_title);

      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      expect(ogDescription?.getAttribute("content")).toBe(
        mockBlog.meta_description
      );

      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage?.getAttribute("content")).toBe(
        `/images/${mockBlog.image}.png`
      );

      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      expect(twitterTitle?.getAttribute("content")).toBe(mockBlog.meta_title);

      const twitterDescription = document.querySelector(
        'meta[name="twitter:description"]'
      );
      expect(twitterDescription?.getAttribute("content")).toBe(
        mockBlog.meta_description
      );

      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      expect(twitterImage?.getAttribute("content")).toBe(
        `/images/${mockBlog.image}.png`
      );
    });
  });
});
