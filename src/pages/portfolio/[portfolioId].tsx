import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../../lib/prisma";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { PortfolioType } from "../../../custom";
import { toSentenceCase, toTitleCase } from "@/utils/stringUtils";

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
      <h1>{toTitleCase(title)}</h1>
      <h3>{toSentenceCase(description)}</h3>
      <Image
        src="https://placehold.co/300x200/png"
        alt=""
        className="portfolio-image"
        width={300}
        height={200}
        style={{ objectFit: "cover", width: "300px" }}
      />
      <p>url: <a href={url}>{url}</a></p>
      <p>repo: <a href={repoUrl}>{repoUrl}</a></p>
      <p>Categories:</p>
      {categories.map((cat, index) => (
        <p key={index}>{toSentenceCase(cat)}</p>
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
