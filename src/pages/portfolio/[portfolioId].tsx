import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const PortfolioItem: React.FC = () => {
  const router = useRouter();
  const { portfolioId } = router.query;

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
      <h1>Portfolio Item</h1>
      <p>Portfolio ID: {portfolioId}</p>
    </div>
  );
};

export default PortfolioItem;
