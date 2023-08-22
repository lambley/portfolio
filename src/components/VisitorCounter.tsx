import React, { useState, useEffect } from "react";
import axios from "axios";
import DigitFrame from "./digitFrame";

const VisitorCounter = (): JSX.Element => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    async function getVisitorCount() {
      try {
        const response = await axios.post("/api/visitorCount");
        const data = response.data;

        if (data && data.visitorCount !== undefined) {
          setVisitorCount(data.visitorCount);
        } else {
          console.error("Invalid response data:", data);
          setVisitorCount(0);
        }
      } catch (error) {
        console.error(error);
        setVisitorCount(0);
      }
    }
    getVisitorCount();
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
