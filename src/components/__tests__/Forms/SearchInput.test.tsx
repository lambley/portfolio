import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "@/components/Forms/SearchInput";

describe("SearchInput component", () => {
  it("renders correctly", () => {
    const mockOnSearchChange = jest.fn();
    const mockOnClearSearch = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();

    render(
      <SearchInput
        onSearchChange={mockOnSearchChange}
        onClearSearch={mockOnClearSearch}
        isFocused={false}
        searchQuery=""
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("calls onSearchChange when input value changes", () => {
    const mockOnSearchChange = jest.fn();
    const mockOnClearSearch = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();

    render(
      <SearchInput
        onSearchChange={mockOnSearchChange}
        onClearSearch={mockOnClearSearch}
        isFocused={false}
        searchQuery=""
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("test query");
  });

  it("calls onFocus and onClearSearch when input is focused", () => {
    const mockOnSearchChange = jest.fn();
    const mockOnClearSearch = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();

    render(
      <SearchInput
        onSearchChange={mockOnSearchChange}
        onClearSearch={mockOnClearSearch}
        isFocused={false}
        searchQuery=""
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);

    expect(mockOnFocus).toHaveBeenCalled();
    expect(mockOnClearSearch).toHaveBeenCalled();
  });
});
