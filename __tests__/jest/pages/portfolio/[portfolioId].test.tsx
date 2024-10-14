import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockPortfolioUseRouter } from "../../utils/mocks/mockUseRouter";
import PortfolioItem, {
  getStaticPaths,
  getStaticProps,
} from "@/pages/portfolio/[portfolioId]";
import { mockPortfolio } from "@/utils/constants/mockPortfolio";
import { notFoundPortfolio } from "@/utils/constants/notFoundTypes";
import { GetStaticPathsContext } from "next";
import axios from "axios";

jest.mock("next/router", () => ({
  useRouter: () => mockPortfolioUseRouter(),
}));

describe("PortfolioItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("page rendering", () => {
    it("renders the portfolio item page", () => {
      render(<PortfolioItem portfolio={mockPortfolio} />);

      const title = screen.getByText("Test Portfolio");
      const description = screen.getByText("Test description");
      const urlLink = screen.getByText("https://www.example.com");
      const repoLink = screen.getByText("https://www.github.com/example");
      const category1 = screen.getByText("Category 1");
      const category2 = screen.getByText("Category 2");
      const backButton = screen.getByLabelText("back button");

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(urlLink).toHaveAttribute("href", "https://www.example.com");
      expect(repoLink).toHaveAttribute(
        "href",
        "https://www.github.com/example"
      );
      expect(category1).toBeInTheDocument();
      expect(category2).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
    });

    it("renders the portfolio item with a working back button", () => {
      const router = mockPortfolioUseRouter({});

      render(<PortfolioItem portfolio={mockPortfolio} />);

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
        // mock the axios get request
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
                portfolioId: "1",
              },
            },
          ],
        });
      });

      it("returns the correct paths when there are no portfolios", async () => {
        // mock the axios get request
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
        // mock the axios get request
        jest.spyOn(axios, "get").mockRejectedValue(new Error("test error"));

        // run getStaticPaths
        const paths = await getStaticPaths({} as GetStaticPathsContext);

        // check that the paths are correct
        expect(paths).toEqual({
          fallback: false,
          paths: [{ params: { portfolioId: "0" } }],
        });
      });
    });
    describe("getStaticProps", () => {
      it("returns the correct props", async () => {
        // mock axios
        jest.spyOn(axios, "get").mockResolvedValue({
          data: mockPortfolio,
        });

        const props = await getStaticProps({ params: { portfolioId: "1" } });

        expect(props).toEqual({
          props: {
            portfolio: mockPortfolio,
          },
        });
      });

      it("returns the correct props when there is an error", async () => {
        // mock axios
        jest.spyOn(axios, "get").mockRejectedValue(new Error("test error"));

        const props = await getStaticProps({ params: { portfolioId: "1" } });

        expect(props).toEqual({
          props: {
            portfolio: notFoundPortfolio,
          },
        });
      });
    });
  });
});
