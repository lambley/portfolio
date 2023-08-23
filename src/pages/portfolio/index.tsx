import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { PortfolioType } from "../../../custom";
import { toTitleCase } from "@/utils/stringUtils";

interface PortfolioProps {
  feed: any;
}

const Portfolio: React.FC<PortfolioProps> = (props) => {
  const { feed } = props;

  const renderPortfolioList = () => {
    return feed.map((portfolio: PortfolioType) => (
      <div
        className="portfolio-item"
        key={portfolio.id}
        aria-label="portfolio-item"
      >
        <Link
          className="portfolio-link"
          href={`/portfolio/${portfolio.id}`}
          aria-label="portfolio-item-link"
        >
          <div className="portfolio-title">{toTitleCase(portfolio.title)}</div>
          <Image
            src={
              `/images/${portfolio.image}.png` ||
              "https://placehold.co/300x200/png"
            }
            alt=""
            className="portfolio-image"
            width={300}
            height={200}
          />
          <div className="portfolio-description">
            {toTitleCase(portfolio.description)}
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

export const getStaticProps: GetStaticProps = async () => {
  const feed = await axios.get("http://localhost:4000/api/v1/portfolios");
  return {
    props: {
      feed: feed.data,
    },
    revalidate: 10,
  };
};
