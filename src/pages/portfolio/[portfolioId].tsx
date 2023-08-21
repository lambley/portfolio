import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../../lib/prisma";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { PortfolioType } from "../../../custom";
import { toSentenceCase, toTitleCase } from "@/utils/stringUtils";

interface PortfolioItemProps {
  portfolio: PortfolioType;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ portfolio }) => {
  const { id, title, description, image, categories, date } = portfolio;

  const url = portfolio.url || "Not Found";
  const repoUrl = portfolio.repoUrl || "Not Found";

  const router = useRouter();

  const handleBack = () => {
    router.push("/portfolio");
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
          border: "1px solid white"
        }}
      />
      <p>
        url: <a href={url}>{url}</a>
      </p>
      <p>
        repo: <a href={repoUrl}>{repoUrl}</a>
      </p>
      <p>Categories:</p>
      {categories.map((cat, index) => (
        <p key={index}>{toSentenceCase(cat)}</p>
      ))}
      <p>date: {date}</p>
    </div>
  );
};

export default PortfolioItem;

// fetch all possible paths for a single portfolio item
// for static generation of pages
export const getStaticPaths: GetStaticPaths = async () => {
  const portfolios = await prisma.portfolio.findMany();
  const paths = portfolios.map((portfolio) => ({
    params: { portfolioId: portfolio.id.toString() },
  }));

  return { paths, fallback: false };
};

// fetch data for a single portfolio item
export const getStaticProps: GetStaticProps<PortfolioItemProps> = async (
  context
) => {
  const portfolioId = context.params?.portfolioId as string;

  const notFoundPortfolio: PortfolioType = {
    id: 0,
    title: "Not Found",
    description: "Not Found",
    url: "Not Found",
    repoUrl: "Not Found",
    image: "Not Found",
    categories: ["Not Found"],
    date: "Not Found",
  };

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: parseInt(portfolioId, 10) },
    });

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
