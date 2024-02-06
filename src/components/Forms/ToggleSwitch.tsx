import React from "react";

interface ToggleSwitchProps {
  sortFunction: (state: boolean) => void;
  sortState: boolean;
  toggleTextOn: string;
  toggleTextOff: string;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  const { sortFunction, sortState, toggleTextOn, toggleTextOff, ariaLabel } =
    props;

  return (
    <div className="toggle-wrapper" id="toggle-switch" aria-label={ariaLabel}>
      {sortState ? toggleTextOn : toggleTextOff}
      <label className="switch" aria-label={`${ariaLabel} label`}>
        <input
          type="checkbox"
          onChange={() => {
            sortFunction(!sortState);
          }}
          checked={sortState}
          aria-labelledby={`${ariaLabel} label`}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
