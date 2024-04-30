import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/reducers';
import { fetchPhotosByAlbumId, setCurrentPhotoIndex } from '../../utils/redux/actions';
import Button from '../../components/base/button/Button';
import { AppDispatch } from '../../utils/redux/store';

interface AlbumsProps {
  albums: any[];
  photos: any[];
}

const Albums: React.FC<AlbumsProps> = ({ albums, photos }) => {
  const dispatch: AppDispatch = useDispatch();
  const albumPhotoIndices = useSelector((state: RootState) => state.albumPhotoIndices);

  useEffect(() => {
    albums.forEach((album) => {
      dispatch(fetchPhotosByAlbumId(album.id));
    });
  }, [albums, dispatch]);

  const handleNextClick = (albumId: number) => {
    const currentIndex = albumPhotoIndices[albumId] || 0;
    const maxIndex = photos.length - 10;
    if (currentIndex < maxIndex) {
      dispatch(setCurrentPhotoIndex(albumId, currentIndex + 10));
    }
  };

  const handlePrevClick = (albumId: number) => {
    const currentIndex = albumPhotoIndices[albumId] || 0;
    if (currentIndex > 0) {
      dispatch(setCurrentPhotoIndex(albumId, currentIndex - 10));
    }
  };

  return (
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
  );
};

export default Albums;