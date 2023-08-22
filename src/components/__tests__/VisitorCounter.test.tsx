import React from "react";
import { act, render, screen } from "@testing-library/react";
import VisitorCounter from "../VisitorCounter";
import axios from "axios";

jest.mock("axios");

describe("VisitorCounter", () => {
  it("should render correctly", () => {
    render(<VisitorCounter />);
    const counter = screen.getByText(/unique visitor/i);
    expect(counter).toBeInTheDocument();
  });

  it("should render the correct number of visitors", async () => {
    const mockResponse = { data: { visitorCount: 3 } };
    axios.post = jest.fn().mockResolvedValue(mockResponse);

    await act(async () => {
      render(<VisitorCounter />);
    });

    const counter = await screen.findByText(/unique visitor/i);
    expect(counter).toBeInTheDocument();

    expect(axios.post).toHaveBeenCalledWith("/api/visitorCount");

    const digits = screen.getByText("3");
    expect(digits).toBeInTheDocument();
  });
});
