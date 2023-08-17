import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Typewriter from "../Typewriter";

describe("Typewriter", () => {
  it("renders initial text", async () => {
    render(<Typewriter text={"Hello"} delay={100} />);

    await waitFor(() => {
      const text = screen.getByText("Hello");
      expect(text).toBeInTheDocument();
    }, { timeout: 600 });
  });

  it("renders text after delay", () => {});

  it('renders text continuously if "infinite" prop is true', () => {});

  it('renders with optional class if "optionalClass" prop is passed', () => {});
});
