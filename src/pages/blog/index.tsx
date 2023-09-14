import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import moment from "moment";
import { BlogType } from "../../../custom";
import { notFoundBlog } from "@/utils/constants/notFoundTypes";
import { toTitleCase } from "@/utils/stringUtils";
import { getCategoryColour, getCategoryIcon } from "@/utils/categoryColours";
import apiUrl from "@/utils/apiConfig";
import { calculateReadingTime } from "@/utils/readingTime";

interface BlogProps {
  feed: any;
}

const Blog: React.FC<BlogProps> = (props) => {
  const { feed } = props;

  const renderBlogTagsList = (tags: string[]) => {
    return (
      <div className="blog-tags-list">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="blog-tag"
            style={{ backgroundColor: getCategoryColour(tag) }}
          >
            {toTitleCase(tag)} <i className={getCategoryIcon(tag)}></i>
          </div>
        ))}
      </div>
    );
  };

  const renderBlogList = () => {
    return feed.map((blog: BlogType) => (
      <div className="blog-item" key={blog.id} aria-label="blog-item">
        <Link
          className="blog-link"
          href={`/blog/${blog.id}`}
          aria-label="blog-item-link"
        >
          <Image
            src={
              `/images/${blog.image}.png` || "https://placehold.co/300x200/png"
            }
            alt=""
            className="blog-image"
            width={300}
            height={200}
          />
          <div className="blog-item-text">
            <div className="blog-title">
              {toTitleCase(blog.title)}
              <div className="blog-reading-time">
                {calculateReadingTime(blog.content)}
              </div>
            </div>
            <div className="blog-description">
              {toTitleCase(blog.meta_description)}
            </div>
            <div className="blog-metadata">
              <i className="blog-date">
                {moment(blog.created_at).format("MMMM Do YYYY")}
              </i>
              {renderBlogTagsList(blog.tags)}
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="container text-center">
      <h1>Blog</h1>
      <div className="blog-list">{renderBlogList()}</div>
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
