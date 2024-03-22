import React, { useCallback, useMemo } from 'react';

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/button/Button';
import {
  fetchPostsByUserId,
  fetchAlbumsByUserId,
  setSection,
  fetchPhotosByAlbumId,
  setCurrentPhotoIndex,
  logout,
} from '../../utils/redux/actions';
import { RootState } from '../../utils/redux/reducers';
import './mainPage.scss';

interface MainPageProps {
  userData: any[];
  fetchPostsByUserId: (userId: number) => void;
  fetchAlbumsByUserId: (userId: number) => void;
  posts: any[];
  albums: any[];
  section: string;
  setSection: (section: string) => void;
  photos: any[];
  fetchPhotosByAlbumId: (albumId: number) => void;
  currentIndex: number;
  setCurrentPhotoIndex: (index: number) => void;
  logout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({
  userData,
  fetchPostsByUserId,
  fetchAlbumsByUserId,
  fetchPhotosByAlbumId,
  section,
  setSection,
  posts,
  albums,
  photos,
  currentIndex,
  setCurrentPhotoIndex,
  logout,
}) => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    navigate('/');
    logout();
    console.log('Logging out...');
  }, [navigate, logout]);

  const handleNextClick = useCallback(() => {
    setCurrentPhotoIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 12);
  }, [currentIndex, photos.length, setCurrentPhotoIndex]);

  const handlePrevClick = useCallback(() => {
    setCurrentPhotoIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 12);
  }, [currentIndex, photos.length, setCurrentPhotoIndex]);

  const handlePostsButtonClick = useCallback(
    (userId: number) => {
      fetchPostsByUserId(userId);
      setSection('Posts');
    },
    [fetchPostsByUserId, setSection],
  );

  const handleAlbumsButtonClick = useCallback(
    (userId: number) => {
      fetchAlbumsByUserId(userId);
      setSection('Albums');
      fetchPhotosByAlbumId(userId);
    },
    [fetchAlbumsByUserId, fetchPhotosByAlbumId, setSection],
  );

  const handleMyProfileButtonClick = useCallback(() => {
    setSection('MyProfile');
  }, [setSection]);

  const visiblePhotos = useMemo(
    () => photos.slice(currentIndex, currentIndex + 12),
    [photos, currentIndex],
  );

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
          <Button
            buttonStyle="buttonMenu"
            children={'Albums'}
            onClick={() => handleAlbumsButtonClick(userData[0].id)}
          />
          <Button
            buttonStyle="buttonMenu"
            children={'Posts'}
            onClick={() => handlePostsButtonClick(userData[0].id)}
          />
        </div>

        {section === 'Posts' && (
          <div className="PostsContainer">
            {posts.map((post, index) => (
              <div className="post" key={index}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}

        {section === 'Albums' && (
          <div className="AlbumsContainer">
            {albums.map((album, index) => (
              <div className="album" key={index}>
                <h3>{album.title}</h3>
                <div className="photos">
                  {visiblePhotos.map((photo, idx) => (
                    <img className="photo" key={idx} src={photo.thumbnailUrl} alt={photo.title} />
                  ))}
                </div>
                <div>
                  <Button buttonStyle="secondary" onClick={handlePrevClick}>
                    Previous
                  </Button>
                  <Button buttonStyle="secondary" onClick={handleNextClick}>
                    Next
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'MyProfile' && (
          <div className="userContainer">
            {userData.map((user, index) => (
              <div className="nameContainer" key={index}>
                <div className="Name">Name: {user.name}</div>
                <div className="email">Email: {user.email}</div>
                <div className="adress">
                  Address: Street - {user.address.street}, Suite - {user.address.suite}, City -
                  {user.address.city}, CityCODE - {user.address.zipcode}
                </div>
                <div className="Phone">Phone: {user.phone}</div>
                <div className="webSite">Website: {user.website}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  userData: state.auth.userData || [],
  posts: state.posts || [],
  section: state.section || 'MyProfile',
  albums: state.albums || [],
  photos: state.photos || [],
  currentIndex: state.currentIndex,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchPostsByUserId: (userId: number) => dispatch(fetchPostsByUserId(userId)),
  setSection: (section: string) => dispatch(setSection(section)),
  fetchAlbumsByUserId: (userId: number) => dispatch(fetchAlbumsByUserId(userId)),
  fetchPhotosByAlbumId: (albumId: number) => dispatch(fetchPhotosByAlbumId(albumId)),
  setCurrentPhotoIndex: (index: number) => dispatch(setCurrentPhotoIndex(index)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
