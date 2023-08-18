import React from "react";
import Link from "next/link";

const Portfolio: React.FC = () => {
  const portfolioSampleData = [
    { portfolioId: "1", portfolioName: "Portfolio 1" },
    { portfolioId: "2", portfolioName: "Portfolio 2" },
    { portfolioId: "3", portfolioName: "Portfolio 3" },
    { portfolioId: "4", portfolioName: "Portfolio 4" },
    { portfolioId: "5", portfolioName: "Portfolio 5" },
    { portfolioId: "6", portfolioName: "Portfolio 6" },
  ];

  return (
    <div className="container my-3 text-center">
      <h1>Portfolio List</h1>
      <i>Project list coming soon</i>
      <div className="portfolio-list">
        {portfolioSampleData.map((portfolio) => (
          <div key={portfolio.portfolioId}>
            <Link href={`/portfolio/${portfolio.portfolioId}`}>
              {portfolio.portfolioName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
