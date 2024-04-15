import React, { useCallback, useEffect, useState } from 'react';
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
  logout: () => void;
  setCurrentPhotoIndex: (albumId: number, index: number) => void;
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
  logout,
  setCurrentPhotoIndex,
}) => {
  const navigate = useNavigate();
  const [albumPhotoIndices, setAlbumPhotoIndices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (section === 'Albums' && albums.length > 0) {
      albums.forEach((album) => {
        fetchPhotosByAlbumId(album.id);
        setAlbumPhotoIndices((prevState) => ({
          ...prevState,
          [album.id]: 0,
        }));
      });
    }
  }, [albums, fetchPhotosByAlbumId, section]);

  const handleLogout = useCallback(() => {
    navigate('/');
    logout();
    console.log('Logging out...');
  }, [navigate, logout]);

  const handleNextClick = useCallback(
    (albumId: number) => {
      const currentIndex = albumPhotoIndices[albumId] || 0;
      const maxIndex = photos.length - 10;
      if (currentIndex < maxIndex) {
        setCurrentPhotoIndex(albumId, currentIndex + 10);
        setAlbumPhotoIndices((prevState) => ({
          ...prevState,
          [albumId]: currentIndex + 10,
        }));
      }
    },
    [albumPhotoIndices, setCurrentPhotoIndex, photos],
  );

  const handlePrevClick = useCallback(
    (albumId: number) => {
      const currentIndex = albumPhotoIndices[albumId] || 0;
      if (currentIndex > 0) {
        setCurrentPhotoIndex(albumId, currentIndex - 10);
        setAlbumPhotoIndices((prevState) => ({
          ...prevState,
          [albumId]: currentIndex - 10,
        }));
      }
    },
    [albumPhotoIndices, setCurrentPhotoIndex],
  );

  const handlePostsButtonClick = useCallback(() => {
    fetchPostsByUserId(userData[0].id);
    setSection('Posts');
  }, [fetchPostsByUserId, setSection, userData]);

  const handleAlbumsButtonClick = useCallback(() => {
    fetchAlbumsByUserId(userData[0].id);
    setSection('Albums');
  }, [fetchAlbumsByUserId, setSection, userData]);

  const handleMyProfileButtonClick = useCallback(() => {
    setSection('MyProfile');
  }, [setSection]);

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
                  {photos
                    .slice(albumPhotoIndices[album.id], albumPhotoIndices[album.id] + 10)
                    .map((photo, idx) => (
                      <img className="photo" key={idx} src={photo.thumbnailUrl} alt={photo.title} />
                    ))}
                </div>
                <div className="button_container">
                  <Button buttonStyle="secondary" onClick={() => handlePrevClick(album.id)}>
                    Previous
                  </Button>
                  <Button buttonStyle="secondary" onClick={() => handleNextClick(album.id)}>
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
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchPostsByUserId: (userId: number) => dispatch(fetchPostsByUserId(userId)),
  fetchAlbumsByUserId: (userId: number) => dispatch(fetchAlbumsByUserId(userId)),
  fetchPhotosByAlbumId: (albumId: number) => dispatch(fetchPhotosByAlbumId(albumId)),
  setSection: (section: string) => dispatch(setSection(section)),
  setCurrentPhotoIndex: (_albumId: number, index: number) => dispatch(setCurrentPhotoIndex(index)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
