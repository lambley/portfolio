import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <LoadingSpinner />
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
