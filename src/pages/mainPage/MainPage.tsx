import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/header/Header';
import { fetchRandomPosts } from '../../utils/redux/actions';
import { RootState } from '../../utils/redux/reducers';
import { AppDispatch } from '../../utils/redux/store';
import './mainPage.scss';

const MainPage: React.FC = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const randomPosts = useSelector((state: RootState) => state.randomPosts);

  useEffect(() => {
    dispatch(fetchRandomPosts());
  }, [dispatch]);

  return (
    <div className="MainPage-container">
      <Header />
      <div className="SosialInfo"></div>
      <div className="RandomPostsContainer">
        <h2>Random Posts</h2>
        <ul>
          {randomPosts.map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
