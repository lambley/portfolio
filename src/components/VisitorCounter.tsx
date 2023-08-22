import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div className="visitor-counter text-center">
      <div className="counter-wrapper">
        <span className="counter-digits">{visitorCount}</span>
      </div>
      <p className="counter-label">Unique Visitors</p>
    </div>
  );
};

export default VisitorCounter;
