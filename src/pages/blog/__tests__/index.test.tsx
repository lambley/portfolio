import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, screen } from "@testing-library/react";
import Blog, { getStaticProps } from "../index";
import { mockBlog, mockBlogList } from "@/utils/constants/mockPortfolio";
import apiUrl from "@/utils/apiConfig";
import { BlogType } from "../../../../custom";

describe("Blog", () => {
  const mockFeed = mockBlogList;

  it("should render the blog page", () => {
    render(<Blog feed={mockFeed} />);
    const blogHeader = screen.getByText("Blog");

    expect(blogHeader).toBeInTheDocument();
  });

  it("should render the blog list", async () => {
    +render(<Blog feed={mockFeed} />);
    const blogItems = screen.getAllByLabelText("blog-item");

    expect(blogItems).toHaveLength(2);
  });

  describe("getStaticProps", () => {
    it("should return the blog feed", async () => {
      const mockFeedWithDraft = [
        ...mockFeed,
        {
          ...mockBlog,
          status: "draft",
        },
      ];

      const mock = new MockAdapter(axios);

      mock.onGet(`${apiUrl}/api/v1/blogs`).reply(200, mockFeedWithDraft);

      const response = (await getStaticProps({})) as {
        props: { feed: BlogType[] };
      };
      expect(response.props.feed).toHaveLength(mockFeed.length);

      mock.reset();
    });
  });
});
