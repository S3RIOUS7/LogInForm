import { useState, useEffect } from 'react';
import axios from 'axios';
import { generationToken } from '../../../utils/helpers';

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [randomToken, setRandomToken] = useState<string>('');

  useEffect(() => {
    const fetchAlbumsAndGenerateToken = async () => {
      try {
        const albumsResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
        const firstFiveAlbums = albumsResponse.data.slice(0, 5);
        setAlbums(firstFiveAlbums);

        const photosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setPhotos(photosResponse.data);

        setRandomToken(generationToken(15));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAlbumsAndGenerateToken();
  }, []);

  return (
    <div>
      <h1>Список альбомов</h1>

      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <strong>{album.title}</strong>
            <ul>
              {photos
                .filter((photo) => photo.albumId === album.id)
                .map((photo) => (
                  <li key={photo.id}>
                    <img src={photo.url} alt={photo.title} style={{ maxWidth: '100px' }} />
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>

      <p>Случайный токен: {randomToken}</p>
    </div>
  );
}

export default AlbumsPage;
