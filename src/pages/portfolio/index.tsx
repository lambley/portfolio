import React from "react";
import Link from "next/link";
import Image from "next/image";

const Portfolio: React.FC = () => {
  const portfolioSampleData = [
    { portfolioId: "1", portfolioName: "Portfolio 1" },
    { portfolioId: "2", portfolioName: "Portfolio 2" },
    { portfolioId: "3", portfolioName: "Portfolio 3" },
    { portfolioId: "4", portfolioName: "Portfolio 4" },
    { portfolioId: "5", portfolioName: "Portfolio 5" },
    { portfolioId: "6", portfolioName: "Portfolio 6" },
  ];

  const renderPortfolioList = () => {
    return portfolioSampleData.map((portfolio) => (
      <div className="portfolio-item" key={portfolio.portfolioId}>
        <Link
          className="portfolio-link"
          href={`/portfolio/${portfolio.portfolioId}`}
        >
          {portfolio.portfolioName}
          <Image
            src="https://placehold.co/300x200/png"
            alt=""
            width={300}
            height={200}
          />
        </Link>
      </div>
    ));
  };

  return (
    <div className="container text-center">
      <h1>Portfolio List</h1>
      <div className="portfolio-list">{renderPortfolioList()}</div>
    </div>
  );
};

export default Portfolio;
