import React from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { GetStaticPaths, GetStaticProps } from "next";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { BlogType, BlogItemProps } from "../../../custom";
import { notFoundBlog } from "@/utils/constants/notFoundTypes";
import { getCategoryColour, getCategoryIcon } from "@/utils/categoryColours";
import { toSentenceCase, toTitleCase } from "@/utils/stringUtils";
import { calculateReadingTime } from "@/utils/readingTime";
import apiUrl from "@/utils/apiConfig";

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  let {
    id,
    title,
    content,
    image,
    meta_title,
    meta_description,
    tags,
    created_at,
    updated_at,
  } = blog;

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const renderTags = (tags: string[]) => {
    return (
      <div className="portfolio-details-categories-list">
        {tags.map((tag, index) => (
          <p
            key={index}
            className="portfolio-detail-category"
            style={{ backgroundColor: getCategoryColour(tag) }}
          >
            {toSentenceCase(tag)} <i className={getCategoryIcon(tag)}></i>
          </p>
        ))}
      </div>
    );
  };

  const meta = {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.content.substring(0, 150),
    image: `/images/${blog.image}.png` || "/images/aaron.png",
  };

  return (
    <div className="container text-center">
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <button
        className="portfolio-back-button"
        aria-label="back button"
        onClick={handleBack}
      >
        <FontAwesomeIcon icon={faCaretLeft} /> Back
      </button>
      <div>
        <h1 className="blog-detail-title">{title}</h1>
        <div
          className="blog-reading-time"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {calculateReadingTime(blog.content)}
        </div>
        <i>{moment(created_at).format("MMMM Do YYYY")}</i>
      </div>
      <Image
        src={`/images/${image}.png` || "https://placehold.co/300x200/png"}
        alt={title}
        className="portfolio-image"
        width={300}
        height={200}
        style={{
          objectFit: "cover",
          width: "300px",
        }}
      />
      <div className="react-markdown-wrapper">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div>{renderTags(tags)}</div>
    </div>
  );
};

export default BlogItem;

// fetch all possible paths for a single portfolio item
// for static generation of pages
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/blogs`);
    const blogs = res.data;
    const paths = blogs.map((blog: BlogType) => ({
      params: { blogId: blog.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching blog paths:", error);

    return { paths: [{ params: { blogId: "0" } }], fallback: false };
  }
};

// fetch data for a single blog item
export const getStaticProps: GetStaticProps<BlogItemProps> = async (
  context: any
) => {
  const blogId = context.params?.blogId as string;

  try {
    const res = await axios.get(
      `${apiUrl}/api/v1/blogs/${parseInt(blogId, 10)}`
    );
    const blog = res.data;

    if (blog) {
      return {
        props: {
          blog,
        },
      };
    } else {
      return {
        props: {
          blog: notFoundBlog,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        blog: notFoundBlog,
      },
    };
  }
};
