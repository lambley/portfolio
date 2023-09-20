import React from "react";

interface ToggleSwitchProps {
  sortFunction: (state: boolean) => void;
  sortState: boolean;
  toggleTextOn: string;
  toggleTextOff: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  const { sortFunction, sortState, toggleTextOn, toggleTextOff } = props;

  return (
    <div className="toggle-wrapper">
      {sortState ? toggleTextOn : toggleTextOff}
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => {
            sortFunction(!sortState);
          }}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
