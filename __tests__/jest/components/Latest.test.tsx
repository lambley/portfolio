import React from "react";
import Latest from "@/components/Latest";
import { render, waitFor, screen, act } from "@testing-library/react";
import { mockPortfolio, mockBlog } from "@/utils/constants/mockPortfolio";
import axios from "axios";

jest.mock("axios");

const mockResponseData = {
  latestPortfolio: mockPortfolio,
  latestBlog: mockBlog,
};

describe("Latest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it("renders correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockResponseData,
    });

    await act(async () => {
      render(<Latest />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("Latest Project")).toBeInTheDocument();
    expect(screen.getByText("Latest Blog")).toBeInTheDocument();
  });

  it("renders loading indicator initially", async () => {
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockResponseData });
        }, 1000);
      })
    );

    await act(async () => {
      render(<Latest />);
    });

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("Latest Project")).toBeInTheDocument();
    expect(screen.getByText("Latest Blog")).toBeInTheDocument();
  });

  it("renders error message when API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<Latest />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred while fetching data.")
      ).toBeInTheDocument();
      expect(screen.queryByText("Latest Project")).toBeNull();
      expect(screen.queryByText("Latest Blog")).toBeNull();
    });
  });

  it("renders latest portfolio and blog titles when API call succeeds", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockResponseData,
    });

    await act(async () => {
      render(<Latest />);
    });

    await waitFor(() => {
      expect(screen.getByText(mockPortfolio.title)).toBeInTheDocument();
      expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    });
  });
});
