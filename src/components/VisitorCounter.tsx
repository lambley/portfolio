import React, { useState, useEffect } from "react";

const VisitorCounter = (): JSX.Element => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    async function getVisitorCount() {
      const res = await fetch("/api/visitorCount", {
        method: "POST",
        headers: { Cookie: document.cookie },
      });
      const data = await res.json();
      setVisitorCount(data.visitorCount);
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
