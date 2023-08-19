import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "../../../lib/prisma";
import { GetStaticProps } from "next";
import { PortfolioType } from "../../../custom";

interface PortfolioProps {
  feed: any;
}

const Portfolio: React.FC<PortfolioProps> = (props) => {
  const { feed } = props;

  const renderPortfolioList = () => {
    return feed.map((portfolio:PortfolioType) => (
      <div className="portfolio-item" key={portfolio.id}>
        <Link
          className="portfolio-link"
          href={`/portfolio/${portfolio.id}`}
        >
          <div className="portfolio-title">{portfolio.title}</div>
          <Image
            src="https://placehold.co/300x200/png"
            alt=""
            className="portfolio-image"
            width={300}
            height={200}
          />
          <div className="portfolio-description">
            {portfolio.description}
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
  const feed = await prisma.portfolio.findMany();
  return {
    props: { feed },
    revalidate: 10,
  };
};
