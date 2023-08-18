import React from "react";
import Link from "next/link";
import Image from "next/image";

const Portfolio: React.FC = () => {
  const portfolioSampleData = [
    {
      portfolioId: "1",
      portfolioName: "Portfolio 1",
      portfolioDescription: "Portfolio 1 description",
    },
    {
      portfolioId: "2",
      portfolioName: "Portfolio 2",
      portfolioDescription: "Portfolio 2 description",
    },
    {
      portfolioId: "3",
      portfolioName: "Portfolio 3",
      portfolioDescription: "Portfolio 3 description",
    },
    {
      portfolioId: "4",
      portfolioName: "Portfolio 4",
      portfolioDescription: "Portfolio 4 description",
    },
    {
      portfolioId: "5",
      portfolioName: "Portfolio 5",
      portfolioDescription: "Portfolio 5 description",
    },
    {
      portfolioId: "6",
      portfolioName: "Portfolio 6",
      portfolioDescription: "Portfolio 6 description",
    },
  ];

  const renderPortfolioList = () => {
    return portfolioSampleData.map((portfolio) => (
      <div className="portfolio-item" key={portfolio.portfolioId}>
        <Link
          className="portfolio-link"
          href={`/portfolio/${portfolio.portfolioId}`}
        >
          <div className="portfolio-title">{portfolio.portfolioName}</div>
          <Image
            src="https://placehold.co/300x200/png"
            alt=""
            className="portfolio-image"
            width={300}
            height={200}
          />
          <div className="portfolio-description">
            {portfolio.portfolioDescription}
          </div>
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
