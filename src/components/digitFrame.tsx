import React from "react";

const DigitFrame = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="digit-frame">{children}</div>;
};

export default DigitFrame;
