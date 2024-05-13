import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Posts: React.FC = () => {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    const userData = location.state?.userData;
    if (userData) {
      const userPostsFromLocalStorage = localStorage.getItem(`userPosts_${userData[0].id}`);
      if (userPostsFromLocalStorage) {
        setUserPosts(JSON.parse(userPostsFromLocalStorage));
      }
    }
  }, [location]);

  return (
    <div className="postsContainer">
      <h2>User Posts</h2>
      {userPosts.map((post: any, index: number) => (
        <div key={index} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
