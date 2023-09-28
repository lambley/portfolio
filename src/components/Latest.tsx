import React, { useState, useEffect } from "react";
import { PortfolioType, BlogType } from "../../custom";
import {
  notFoundPortfolio,
  notFoundBlog,
} from "@/utils/constants/notFoundTypes";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import Loading from "./Loader/Loading";

const Latest = () => {
  const [portfolio, setPortfolio] = useState<PortfolioType>(notFoundPortfolio);
  const [blog, setBlog] = useState<BlogType>(notFoundBlog);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/latest_data`);
        const { latestPortfolio, latestBlog } = response.data;
        setPortfolio(latestPortfolio);
        setBlog(latestBlog);
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchLatestData();
    }, 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Latest</h1>
      <p>{portfolio.title}</p>
      <p>{blog.title}</p>
    </div>
  );
};

export default Latest;
