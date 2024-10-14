import React from "react";
import Latest from "../../src/components/Latest";
import { render, waitFor, screen } from "@testing-library/react";
import { mockPortfolio, mockBlog } from "@/utils/constants/mockPortfolio";
import axios from "axios";
import { mock } from "node:test";

jest.mock("axios");

const mockResponseData = {
  latestPortfolio: mockPortfolio,
  latestBlog: mockBlog,
};

describe("Latest", () => {
  beforeAll(() => {
    // reset everything before each test
    jest.clearAllMocks();
    jest.spyOn(React, "useEffect").mockReset();

    // mock axios
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockResponseData,
    });
  });

  it("renders correctly", async () => {
    render(<Latest />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("Latest Project")).toBeInTheDocument();
    expect(screen.getByText("Latest Blog")).toBeInTheDocument();
  });

  it("renders loading indicator initially", () => {
    render(<Latest />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
    render(<Latest />);
    await waitFor(() => {
      expect(
        screen.getByText("An error occurred while fetching data.")
      ).toBeInTheDocument();
      expect(screen.queryByText("Latest Project")).toBeNull();
      expect(screen.queryByText("Latest Blog")).toBeNull();
    });
  });

  it("renders latest portfolio and blog titles when API call succeeds", async () => {
    // manually mock axios as the error test above is happening asynchronously and changing the mock values
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockResponseData,
    });
    render(<Latest />);
    await waitFor(() => {
      expect(screen.getByText(mockPortfolio.title)).toBeInTheDocument();
      expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    });
  });
});
