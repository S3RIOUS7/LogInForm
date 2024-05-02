import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/button/Button';
import { fetchPostsByUserId, logout, fetchRandomPosts } from '../../utils/redux/actions';
import { RootState } from '../../utils/redux/reducers';
import { AppDispatch } from '../../utils/redux/store';
import './mainPage.scss';

interface MainPageProps {
  userData: any[];
}

const MainPage: React.FC<MainPageProps> = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const randomPosts = useSelector((state: RootState) => state.randomPosts);

  useEffect(() => {
    dispatch(fetchRandomPosts());
  }, [dispatch]);

  useEffect(() => {
    // Вывод содержимого localStorage при загрузке MainPage
    const userDataFromLocalStorage = localStorage.getItem('userData');
    console.log('UserData from localStorage:', userDataFromLocalStorage);

    // Если userData доступен, вы можете загрузить посты и альбомы этого пользователя из localStorage
    if (userData && userData.length > 0) {
      const userId = userData[0].id;
      const userPosts = localStorage.getItem(`userPosts_${userId}`);
      const userAlbums = localStorage.getItem(`userAlbums_${userId}`);
      console.log('User Posts from localStorage:', userPosts);
      console.log('User Albums from localStorage:', userAlbums);
    }
  }, [userData]);

  const handleLogout = useCallback(() => {
    navigate('/');
    logout();
    console.log('Logging out...');
  }, [navigate, dispatch]);

  const handlePostsButtonClick = useCallback(() => {
    dispatch(fetchPostsByUserId(userData[0].id));
  }, [dispatch, userData]);

  const handleAlbumsButtonClick = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '[]');
    navigate('/Albums', { state: { userData: storedUserData } });
  };
  const handleMyProfileButtonClick = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '[]');
    navigate('/Userprofile', { state: { userData: storedUserData } });
  };

  return (
    <div className="MainPage-container">
      <div className="MainPageHeader">
        <div className="NamePage">
          <h1>You Profile</h1>
        </div>
        <div className="LogOut">
          <Button buttonStyle="logout" children={'Log out'} onClick={handleLogout} />
        </div>
      </div>
      <div className="SosialInfo">
        <div className="ButtonsMenuContainer">
          <Button
            buttonStyle="buttonMenu"
            children={'My profile'}
            onClick={handleMyProfileButtonClick}
          />
          <Button buttonStyle="buttonMenu" children={'Albums'} onClick={handleAlbumsButtonClick} />
          <Button buttonStyle="buttonMenu" children={'Posts'} onClick={handlePostsButtonClick} />
        </div>
      </div>
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
