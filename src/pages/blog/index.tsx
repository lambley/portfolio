import React from "react";
import Image from "next/image";

const Blog: React.FC = () => {
  return (
    <div className="container text-center">
      <h1>Blog</h1>
      <p>Blog posts to come!</p>
      <Image
        src="/images/404.png"
        alt="Under Construction"
        width={300}
        height={200}
      />
    </div>
  );
}

export default Blog;
