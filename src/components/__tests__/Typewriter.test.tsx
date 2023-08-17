import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Typewriter from "../Typewriter";

describe("Typewriter", () => {
  it("renders initial text", async () => {
    render(<Typewriter text={"Hello"} delay={100} />);

    const elementWithClass = screen.getAllByLabelText("typing-text")[0];

    expect(elementWithClass).toBeInTheDocument();
    expect(elementWithClass).toHaveTextContent("");
  });

  it("renders text after delay", async () => {
    render(<Typewriter text={"Hello"} delay={100} />);

    await waitFor(
      () => {
        const text = screen.getByText("Hello");
        expect(text).toBeInTheDocument();
      },
      { timeout: 600 }
    );
  });

  it('renders text continuously if "infinite" prop is true', async () => {
    render(<Typewriter text={"Hello"} delay={100} infinite={true} />);

    // should be blank after all characters have displayed
    await waitFor(
      () => {
        const elementWithClass = screen.getAllByLabelText("typing-text")[0];

        expect(elementWithClass).toBeInTheDocument();
        expect(elementWithClass).toHaveTextContent("");
      },
      { timeout: 700 }
    );

    // should be "Hello" after all characters have displayed a second time
    await waitFor(
      () => {
        const text = screen.getByText("Hello");
        expect(text).toBeInTheDocument();
      },
      { timeout: 1200 }
    );
  });

  it('renders with optional class if "optionalClass" prop is passed', () => {
    render(<Typewriter text={"Hello"} delay={100} optionalClass="test-class" />);

    const elementWithClass = screen.getAllByLabelText("typing-text")[0];
    expect(elementWithClass).toHaveClass("test-class");
  });
});
