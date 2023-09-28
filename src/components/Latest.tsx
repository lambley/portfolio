import React, { useState, useEffect } from "react";
import { PortfolioType, BlogType } from "../../custom";
import {
  notFoundPortfolio,
  notFoundBlog,
} from "@/utils/constants/notFoundTypes";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import Loading from "./Loader/Loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    fetchLatestData();
  }, []);

  if (loading) {
    return (
      <div className="my-3">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="my-3">{error}</div>;
  }

  return (
    <div className="my-3">
      <Row>
        <Col xs={12} lg={6}>
          <div>
            <h2>Latest Project</h2>
            <p>{portfolio.title}</p>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div>
            <h2>Latest Blog</h2>
            <p>{blog.title}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Latest;
