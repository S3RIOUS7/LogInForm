import React from 'react';

interface PostsProps {
  posts: any[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="postsContainer">
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
