import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../../lib/prisma";
import { GetServerSideProps } from "next";
import { PortfolioType } from "../../../custom";

interface PortfolioItemProps {
  portfolio: PortfolioType;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ portfolio }) => {
  const { id, title, description, url, repoUrl, image, categories, date } =
    portfolio;

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
      <h1>{title}</h1>
      <p>{description}</p>
      <p>url: {url}</p>
      <p>repo: {repoUrl}</p>
      <p>image: {image}</p>
      <p>Categories:</p>
      {categories.map((cat, index) => (
        <p key={index}>{cat}</p>
      ))}
      <p>date: {date}</p>
    </div>
  );
};

export default PortfolioItem;

export const getServerSideProps: GetServerSideProps<PortfolioType> = async (
  context
) => {
  const portfolioId = context.query.portfolioId as string;

  const notFoundPortfolio = {
    id: 0,
    title: "Not Found",
    description: "Not Found",
    image: "Not Found",
    url: "Not Found",
  };

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: parseInt(portfolioId) },
    });
    return {
      props: {
        portfolio: portfolio || notFoundPortfolio,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
