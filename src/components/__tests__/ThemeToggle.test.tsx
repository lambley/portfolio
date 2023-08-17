import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import ThemeToggle from "../ThemeToggle";

describe("ThemeToggle", () => {
  // shows the moon icon when light theme is active
  it("renders light theme icon when theme is light", () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    const lightIcon = screen
      .getByLabelText("theme-toggle")
      .querySelector(".svg-inline--fa");

    expect(lightIcon).toHaveAttribute("data-icon", "moon");
  });

  // shows the sun icon when dark theme is active
  it("renders dark theme icon when theme is dark", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    const darkIcon = screen
      .getByLabelText("theme-toggle")
      .querySelector(".svg-inline--fa");

    expect(darkIcon).toHaveAttribute("data-icon", "sun");
  });

  it("calls onToggle function when button is clicked", () => {
    const onToggleMock = jest.fn();
    render(<ThemeToggle theme="light" onToggle={onToggleMock} />);
    const toggleButton = screen.getByLabelText("theme-toggle");

    fireEvent.click(toggleButton);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  // no need to check if theme is light or dark, just that the class is toggled
  // theme is changed in _app.tsx
});
