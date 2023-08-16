import React, { useState, useEffect } from "react";

type TypewriterProps = {
  text: string;
  delay: number;
  infinite?: boolean;
  optionalClass?: Array<string> | string;
};

const Typewriter = (props: TypewriterProps): JSX.Element => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { text, delay, infinite, optionalClass } = props;

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (infinite) {
      setTimeout(() => {
        setCurrentText("");
        setCurrentIndex(0);
      }, 2000);
    }
  }, [currentIndex, delay, text, infinite]);

  const optionalClasses = Array.isArray(optionalClass)
    ? optionalClass.join(" ")
    : optionalClass;

  return (
    <div className={`typewriter ${optionalClasses}`}>
      <p>{currentText}</p>
    </div>
  );
};

export default Typewriter;
