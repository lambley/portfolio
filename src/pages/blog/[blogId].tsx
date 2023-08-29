import React from 'react';
import { useRouter } from 'next/router';

const BlogItem: React.FC = () => {
  const router = useRouter();
  const { blogId } = router.query;

  return <div>Blog Item {blogId}</div>;
};

export default BlogItem;
