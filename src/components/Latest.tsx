import React, { useState, useEffect } from "react";
import { PortfolioType, BlogType } from "../../custom";
import {
  notFoundPortfolio,
  notFoundBlog,
} from "@/utils/constants/notFoundTypes";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import Loading from "./Loader/Loading";
import { Row, Col } from "react-bootstrap";
import { toTitleCase } from "@/utils/stringUtils";
import moment from "moment";

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

  const renderPortfolio = () => {
    return (
      <Col xs={12} lg={6} className="text-center">
        <h2>Latest Project</h2>
        <Link
          href={`/portfolio/${portfolio.id}`}
          aria-label="portfolio-item-link"
          className="latest-link border rounded"
        >
          <Image
            src={
              `/images/${portfolio.image}.png` ||
              "https://placehold.co/300x200/png"
            }
            alt={portfolio.title}
            width={100}
            height={100}
            className="latest-link-image border-right"
          />
          <div className="latest-link-text">
            <p>{toTitleCase(portfolio.title)}</p>
            <small>{moment(portfolio.created_at).format("DD MMM 'YY")}</small>
          </div>
        </Link>
      </Col>
    );
  };

  const renderBlog = () => {
    return (
      <Col xs={12} lg={6} className="text-center">
        <h2>Latest Blog</h2>
        <Link
          href={`/blog/${blog.id}`}
          aria-label="blog-item-link"
          className="latest-link border rounded"
        >
          <Image
            src={
              `/images/${blog.image}.png` || "https://placehold.co/300x200/png"
            }
            alt={blog.title}
            width={100}
            height={100}
            className="latest-link-image border-right"
          />
          <div className="latest-link-text">
            <p>{toTitleCase(blog.title)}</p>
            <small>{moment(blog.created_at).format("DD MMM 'YY")}</small>
          </div>
        </Link>
      </Col>
    );
  };

  return (
    <div className="my-5">
      <Row className="g-5">
        {renderBlog()}
        {renderPortfolio()}
      </Row>
    </div>
  );
};

export default Latest;
