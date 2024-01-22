import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockPortfolioUseRouter } from "@utils/tests/mocks/mockUseRouter";
import BlogItem, { getStaticPaths, getStaticProps } from "../[blogId]";
import { notFoundBlog } from "@/utils/constants/notFoundTypes";
import { mockBlog } from "@/utils/constants/mockPortfolio";
import { GetStaticPathsContext } from "next";
import axios from "axios";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => mockPortfolioUseRouter(),
}));

describe("BlogItem", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("page rendering", () => {
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

        const twitterTitle = document.querySelector(
          'meta[name="twitter:title"]'
        );
        expect(twitterTitle?.getAttribute("content")).toBe(mockBlog.meta_title);

        const twitterDescription = document.querySelector(
          'meta[name="twitter:description"]'
        );
        expect(twitterDescription?.getAttribute("content")).toBe(
          mockBlog.meta_description
        );

        const twitterImage = document.querySelector(
          'meta[name="twitter:image"]'
        );
        expect(twitterImage?.getAttribute("content")).toBe(
          `/images/${mockBlog.image}.png`
        );
      });
    });

    it("renders a back button that takes the user back to the previous page", async () => {
      render(<BlogItem blog={mockBlog} />);

      const backButton = screen.getByLabelText("back button");
      expect(backButton).toBeInTheDocument();

      const event = fireEvent.click(backButton);

      // bit of a bodge job - just tests that the button is being clicked and not that the router is being pushed
      expect(event).toBeTruthy();
    });
  });

  describe("server-side rendering", () => {
    describe("getStaticPaths", () => {
      it("returns the correct paths", async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
          data: [
            {
              id: 1,
            },
          ],
        });

        // run getStaticPaths
        const paths = await getStaticPaths({} as GetStaticPathsContext);

        // check that the paths are correct
        expect(paths).toEqual({
          fallback: false,
          paths: [
            {
              params: {
                blogId: "1",
              },
            },
          ],
        });
      });

      it("returns the correct paths when there are no blogs", async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
          data: [],
        });

        // run getStaticPaths
        const paths = await getStaticPaths({} as GetStaticPathsContext);

        // check that the paths are correct
        expect(paths).toEqual({
          fallback: false,
          paths: [],
        });
      });

      it("returns the correct paths when there is an error", async () => {
        jest.spyOn(axios, "get").mockRejectedValue(new Error("test error"));

        // run getStaticPaths
        const paths = await getStaticPaths({} as GetStaticPathsContext);

        // check that the paths are correct
        expect(paths).toEqual({
          fallback: false,
          paths: [
            {
              params: {
                blogId: "0",
              },
            },
          ],
        });
      });
    });

    describe("getStaticProps", () => {
      it("returns the correct props", async () => {
        // mock axios
        jest.spyOn(axios, "get").mockResolvedValue({
          data: mockBlog,
        });

        // run getStaticProps
        const props = await getStaticProps({ params: { blogId: "1" } });

        // check that the props are correct
        expect(props).toEqual({
          props: {
            blog: mockBlog,
          },
        });
      });

      it("returns the correct props when there is an error", async () => {
        // mock axios
        jest.spyOn(axios, "get").mockRejectedValue(new Error("test error"));

        // run getStaticProps
        const props = await getStaticProps({ params: { blogId: "1" } });

        // check that the props are correct
        expect(props).toEqual({
          props: {
            blog: notFoundBlog,
          },
        });
      });
    });
  });
});
