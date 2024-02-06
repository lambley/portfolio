import React, { useState, useEffect } from "react";
import { getVisitorCount } from "@/api/visitorCount";
import DigitFrame from "./DigitFrame";

const VisitorCounter = (): JSX.Element => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await getVisitorCount();
      setVisitorCount(response.visitorCount);
    }

    fetchData();
  }, []);

  const digitArray = visitorCount.toString().split("").map(Number);

  return (
    <div className="visitor-counter text-center">
      {digitArray.map((digit, index) => (
        <DigitFrame key={index}>
          <span className="counter-digits">{digit}</span>
        </DigitFrame>
      ))}
      <p className="counter-label">Unique Visitors</p>
    </div>
  );
};

export default VisitorCounter;
