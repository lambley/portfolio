import React, { useState, useEffect } from "react";

type TypewriterProps = {
  text: string;
  delay: number;
};

const Typewriter = (props: TypewriterProps): JSX.Element => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { text, delay } = props;

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className="typewriter">
      <p>{currentText}</p>
    </div>
  );
};

export default Typewriter;
