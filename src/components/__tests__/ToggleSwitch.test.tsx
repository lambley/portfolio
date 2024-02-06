import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToggleSwitch from "../Forms/ToggleSwitch";

describe("ToggleSwitch", () => {
  const toggleSwitchProps = {
    sortFunction: jest.fn((currentState) => !currentState),
    sortState: true,
    toggleTextOn: "On",
    toggleTextOff: "Off",
    ariaLabel: "toggle-switch",
  };

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

  it("calls the sort function when the toggle switch is clicked", async () => {
    render(<ToggleSwitch {...toggleSwitchProps} />);
    const toggleSwitchLabel = screen.getByLabelText(
      `${toggleSwitchProps.ariaLabel} label`
    );

    fireEvent.click(toggleSwitchLabel);

    await waitFor(() => {
      const spyOn = jest.spyOn(toggleSwitchProps, "sortFunction");
      expect(spyOn).toHaveBeenCalled();
      expect(spyOn).toHaveBeenCalledTimes(1);

      const call = spyOn.mock.calls[0];
      expect(call[0]).toBe(!toggleSwitchProps.sortState);
    });
  });
});
