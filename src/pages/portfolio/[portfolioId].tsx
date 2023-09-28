import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import moment from "moment";
import { PortfolioType, PortfolioItemProps } from "../../../custom";
import { notFoundPortfolio } from "@/utils/constants/notFoundTypes";
import { toSentenceCase, toTitleCase } from "@/utils/stringUtils";
import { getCategoryColour, getCategoryIcon } from "@/utils/categoryColours";
import apiUrl from "@/utils/apiConfig";

const PortfolioItem: React.FC<PortfolioItemProps> = ({ portfolio }) => {
  let { id, title, description, image, category, created_at, updated_at } =
    portfolio;

  const url = portfolio.url || "Not Found";
  const repoUrl = portfolio.repo_url || "Not Found";

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const renderCategories = (categories: string[]) => {
    return (
      <div className="portfolio-details-categories-list">
        {categories.map((cat, index) => (
          <p
            key={index}
            className="portfolio-detail-category"
            style={{ backgroundColor: getCategoryColour(cat) }}
          >
            {toSentenceCase(cat)} <i className={getCategoryIcon(cat)}></i>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="container text-center">
      <button
        className="portfolio-back-button"
        aria-label="back button"
        onClick={handleBack}
      >
        <FontAwesomeIcon icon={faCaretLeft} /> Back
      </button>
      <h1 className="portfolio-detail-title">{toTitleCase(title)}</h1>
      <h4>{toSentenceCase(description)}</h4>
      <Image
        src={
          `/images/${portfolio.image}.png` || "https://placehold.co/300x200/png"
        }
        alt=""
        className="portfolio-image"
        width={300}
        height={200}
        style={{
          objectFit: "cover",
          width: "300px",
        }}
      />
      <p>
        url: <a href={url}>{url}</a>
      </p>
      <p>
        repo: <a href={repoUrl}>{repoUrl}</a>
      </p>
      <p>Categories:</p>
      {renderCategories(category)}
      <p>date: {moment(created_at).format("DD-MMM-YY")}</p>
    </div>
  );
};

export default PortfolioItem;

// fetch all possible paths for a single portfolio item
// for static generation of pages
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/portfolios`);
    const portfolios = res.data;
    const paths = portfolios.map((portfolio: PortfolioType) => ({
      params: { portfolioId: portfolio.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching portfolio paths:", error);

    return { paths: [{ params: { portfolioId: "0" } }], fallback: false };
  }
};

// fetch data for a single portfolio item
export const getStaticProps: GetStaticProps<PortfolioItemProps> = async (
  context
) => {
  const portfolioId = context.params?.portfolioId as string;

  try {
    const res = await axios.get(
      `${apiUrl}/api/v1/portfolios/${parseInt(portfolioId, 10)}`
    );
    const portfolio = res.data;

    if (portfolio) {
      return {
        props: {
          portfolio,
        },
      };
    } else {
      return {
        props: {
          portfolio: notFoundPortfolio,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        portfolio: notFoundPortfolio,
      },
    };
  }
};
