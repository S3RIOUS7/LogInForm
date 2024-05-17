import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../base/button/Button';
import { logout } from '../../utils/redux/actions';
import './Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
    console.log('Logging out...');
  }, [dispatch, navigate]);

  const handleMyProfileButtonClick = useCallback(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '[]');
    navigate('/Userprofile', { state: { userData: storedUserData } });
  }, [navigate]);

  const handleAlbumsButtonClick = useCallback(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '[]');
    navigate('/Albums', { state: { userData: storedUserData } });
  }, [navigate]);

  const handlePostsButtonClick = useCallback(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '[]');
    navigate('/Posts', { state: { userData: storedUserData } });
  }, [navigate]);

  return (
    <div className="MainPageHeader">
      <div className="NamePage">
        <h1>Your Profile</h1>
        <div className="DropdownMenu">
          <Button
            buttonStyle="buttonMenu"
            children={'My profile'}
            onClick={handleMyProfileButtonClick}
          />
          <Button buttonStyle="buttonMenu" children={'Albums'} onClick={handleAlbumsButtonClick} />
          <Button buttonStyle="buttonMenu" children={'Posts'} onClick={handlePostsButtonClick} />
        </div>
      </div>
      <div className="LogOut">
        <Button buttonStyle="logout" children={'Log out'} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
