import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import VisitorCounter from "../VisitorCounter";
import * as visitorCountApi from "@/api/visitorCount";

jest.mock("@/api/visitorCount");

describe("VisitorCounter", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the correct number of visitors", async () => {
    const mockResponse = {
      success: true,
      message: "Visitor count retrieved successfully",
      visitorCount: 4,
    };
    (visitorCountApi.getVisitorCount as jest.Mock).mockResolvedValue(
      mockResponse
    );

    await act(async () => {
      render(<VisitorCounter />);
    });

    await waitFor(() => {
      const counter = screen.getByText(/unique visitor/i);
      expect(counter).toBeInTheDocument();

      const digits = screen.getByText("4");
      expect(digits).toBeInTheDocument();
    });
  });
});
