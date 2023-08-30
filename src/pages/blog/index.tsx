import React, { Suspense } from "react";
import axios from "axios";
import apiUrl from "@/utils/apiConfig";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { BlogType, PortfolioType } from "../../../custom";
import { notFoundBlog } from "@/utils/constants/notFoundTypes";
import { toTitleCase } from "@/utils/stringUtils";
import {
  getAllCategoryColours,
  getCategoryIcon,
} from "@/utils/categoryColours";
import Loading from "@/components/Loader/Loading";

interface BlogProps {
  feed: any;
}

const Blog: React.FC<BlogProps> = (props) => {
  const { feed } = props;

  const renderBlogList = () => {
    return feed.map((blog: BlogType) => (
      <div className="portfolio-item" key={blog.id} aria-label="blog-item">
        <Link
          className="portfolio-link"
          href={`/blog/${blog.id}`}
          aria-label="blog-item-link"
        >
          <div className="portfolio-title">{toTitleCase(blog.title)}</div>
          <Image
            src={
              `/images/${blog.image}.png` || "https://placehold.co/300x200/png"
            }
            alt=""
            className="portfolio-image"
            width={300}
            height={200}
          />
          <div className="portfolio-description">
            {toTitleCase(blog.meta_description)}
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="container text-center">
      <h1>Blog</h1>
      <Suspense fallback={<Loading />}>
        <div className="portfolio-list">{renderBlogList()}</div>
      </Suspense>
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await axios.get(`${apiUrl}/api/v1/blogs`);

    // sort blog feed by date by default
    const sortedFeed = feed.data.sort((a: BlogType, b: BlogType) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });

    return {
      props: {
        feed: sortedFeed,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);

    return {
      props: {
        feed: [notFoundBlog],
      },
      revalidate: 10,
    };
  }
};
