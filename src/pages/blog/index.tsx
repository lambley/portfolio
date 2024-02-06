import React, { useState, useEffect } from "react";
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
import ToggleSwitch from "@/components/Forms/ToggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

interface BlogProps {
  feed: any;
}

const Blog: React.FC<BlogProps> = (props) => {
  const [feed, setFeed] = useState(props.feed);
  const [sortByDateNewest, setSortByDateNewest] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFeed, setFilteredFeed] = useState<BlogType[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    sortFeed();
  }, [sortByDateNewest]);

  const sortFeed = () => {
    const sortedFeed = feed.sort((a: BlogType, b: BlogType) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortByDateNewest ? dateB - dateA : dateA - dateB;
    });
    setFeed([...sortedFeed]);
  };

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
    const blogsToRender = searchQuery ? filteredFeed : feed;

    return blogsToRender.map((blog: BlogType) => (
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = props.feed.filter((blog: BlogType) => {
      const title = blog.title.toLowerCase();
      return title.includes(query);
    });

    setFilteredFeed(filtered);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="container text-center">
      <h1>Blog</h1>
      <div className="blog-controls">
        <div className="search-wrapper">
          <label htmlFor="searchInput">Search</label>
          <div
            className={`search-container ${isInputFocused ? "focused" : ""}`}
          >
            <input
              type="text"
              id="searchInput"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {searchQuery !== "" && (
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="clear-search"
                onClick={() => {
                  setSearchQuery("");
                  setFilteredFeed([]);
                }}
              />
            )}
            {!isInputFocused && searchQuery === "" && (
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            )}
          </div>
        </div>
        <ToggleSwitch
          sortFunction={setSortByDateNewest}
          sortState={sortByDateNewest}
          toggleTextOn="Newest"
          toggleTextOff="Oldest"
          ariaLabel="sort blog posts by date"
        />
      </div>
      <div className="blog-list">{renderBlogList()}</div>
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await axios.get(`${apiUrl}/api/v1/blogs`);

    const publishedFeed = feed.data.filter(
      (blog: BlogType) => blog.status === "published"
    );

    return {
      props: {
        feed: publishedFeed,
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
