import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToggleSwitch from "../ToggleSwitch";

describe("ToggleSwitch", () => {
  const toggleSwitchProps = {
    sortFunction: jest.fn(),
    sortState: true,
    toggleTextOn: "On",
    toggleTextOff: "Off",
    ariaLabel: "toggle-switch",
  };

  toggleSwitchProps.sortFunction.mockImplementation(
    (currentState) => !currentState
  );

  it("renders the toggle switch", () => {
    render(<ToggleSwitch {...toggleSwitchProps} />);
    const toggleSwitch = screen.getByLabelText(toggleSwitchProps.ariaLabel);

    expect(toggleSwitch).toBeInTheDocument();
  });

  it("renders the toggle switch with the correct text", () => {
    render(<ToggleSwitch {...toggleSwitchProps} />);
    const toggleSwitch = screen.getByLabelText(toggleSwitchProps.ariaLabel);

    expect(toggleSwitch).toHaveTextContent(toggleSwitchProps.toggleTextOn);
  });
});
