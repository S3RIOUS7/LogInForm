import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/button/Button';
import { fetchPostsByUserId, fetchAlbumsByUserId, logout } from '../../utils/redux/actions';
import { AppDispatch } from '../../utils/redux/store';
import './mainPage.scss';

interface MainPageProps {
  userData: any[];
}

const MainPage: React.FC<MainPageProps> = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = useCallback(() => {
    navigate('/');
    logout();
    console.log('Logging out...');
  }, [navigate, dispatch]);

  const handlePostsButtonClick = useCallback(() => {
    dispatch(fetchPostsByUserId(userData[0].id));
  }, [dispatch, userData]);

  const handleAlbumsButtonClick = useCallback(() => {
    dispatch(fetchAlbumsByUserId(userData[0].id));
  }, [dispatch, userData]);

  const handleMyProfileButtonClick = useCallback(() => {}, [dispatch]);

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
    </div>
  );
};

export default MainPage;
