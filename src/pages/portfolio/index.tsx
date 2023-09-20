import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { PortfolioType } from "../../../custom";
import { notFoundPortfolio } from "@/utils/constants/notFoundTypes";
import { toTitleCase } from "@/utils/stringUtils";
import {
  getAllCategoryColours,
  getCategoryIcon,
} from "@/utils/categoryColours";
import apiUrl from "@/utils/apiConfig";

interface PortfolioProps {
  feed: any;
}

const Portfolio: React.FC<PortfolioProps> = (props) => {
  const [feed, setFeed] = useState(props.feed);
  const [sortByDateNewest, setSortByDateNewest] = useState<boolean>(true);

  useEffect(() => {
    sortFeed();
  }, [sortByDateNewest]);

  const sortFeed = () => {
    const sortedFeed = feed.sort((a: PortfolioType, b: PortfolioType) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortByDateNewest ? dateB - dateA : dateA - dateB;
    });
    setFeed(sortedFeed);
  };

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

  const renderAllCategories = () => {
    const categoryColours = getAllCategoryColours();
    return Object.keys(categoryColours).map((category, index) => (
      <div
        className="portfolio-detail-category"
        key={index}
        style={{ backgroundColor: categoryColours[category] }}
      >
        {category} <i className={getCategoryIcon(category)}></i>
      </div>
    ));
  };

  return (
    <div className="container text-center">
      <h1>Portfolio List</h1>
      <h2>Technologies</h2>
      <div className="portfolio-details-categories-list">
        {renderAllCategories()}
      </div>
      <button
        className="sort-button"
        onClick={() => {
          setSortByDateNewest(!sortByDateNewest);
        }}
      >
        {sortByDateNewest ? "Newest" : "Oldest"}
      </button>
      <div className="portfolio-list mb-3">{renderPortfolioList()}</div>
    </div>
  );
};

export default Portfolio;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await axios.get(`${apiUrl}/api/v1/portfolios`);

    return {
      props: {
        feed: feed.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);

    return {
      props: {
        feed: [notFoundPortfolio],
      },
      revalidate: 10,
    };
  }
};
