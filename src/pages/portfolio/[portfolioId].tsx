import React from "react";
import { useRouter } from "next/router";

const PortfolioItem: React.FC = () => {
  const router = useRouter();
  const { portfolioId } = router.query;

  return (
    <div className="container my-3 text-center">
      <h1>Portfolio Item</h1>
      <p>Portfolio ID: {portfolioId}</p>
    </div>
  );
};

export default PortfolioItem;
