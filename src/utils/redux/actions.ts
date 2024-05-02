import { Dispatch } from 'redux';
import { API_BASE_URL } from '../constants/constants';

export const setUsernameInput = (username: string) => ({
  type: 'SET_USERNAME_INPUT',
  payload: username,
});

export const setPassword = (password: string) => ({
  type: 'SET_PASSWORD',
  payload: password,
});

export const setUsername = (username: string) => ({
  type: 'SET_USERNAME',
  payload: username,
});

export const saveUserData = (userData: Array<any>) => ({
  type: 'SAVE_USER_DATA',
  payload: userData,
});

export const savePosts = (posts: any[]) => ({
  type: 'SAVE_POSTS',
  payload: posts,
});
export const saveAlbums = (albums: any[]) => ({
  type: 'SAVE_ALBUMS',
  payload: albums,
});

export const savePhotos = (photos: any[]) => ({
  type: 'SAVE_PHOTOS',
  payload: photos,
});
export const setCurrentPhotoIndex = (albumId: number, index: number) => ({
  type: 'SET_CURRENT_PHOTO_INDEX',
  payload: { albumId, index },
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const saveRandomPosts = (posts: any[]) => ({
  type: 'SAVE_RANDOM_POSTS',
  payload: posts,
});

export const fetchRandomPosts = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 10); // Выбираем случайные 10 постов
    dispatch(saveRandomPosts(randomPosts));
  } catch (error) {
    console.error('Error fetching random posts', error);
  }
};

export const fetchPostsByUserId = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
    const posts = await response.json();
    dispatch({ type: 'SAVE_POSTS', payload: posts });
    // Сохранение данных о постах в localStorage
    localStorage.setItem(`userPosts_${userId}`, JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching posts', error);
  }
};
export const fetchAlbumsByUserId = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/albums?userId=${userId}`);
    const albums = await response.json();
    dispatch({ type: 'SAVE_ALBUMS', payload: albums });
    // Сохранение данных об альбомах в localStorage
    localStorage.setItem(`userAlbums_${userId}`, JSON.stringify(albums));
  } catch (error) {
    console.error('Error fetching albums', error);
  }
};

export const fetchPhotosByAlbumId =
  (albumId: number) => async (dispatch: Dispatch, _getState: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/photos?albumId=${albumId}`);
      const photos = await response.json();
      dispatch({ type: 'SAVE_PHOTOS', payload: photos });
    } catch (error) {
      console.error('Error fetching photos', error);
    }
  };

export const fetchDataByUsername =
  (username: string) => async (dispatch: Dispatch, _getState: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users?username=${username}`);
      const userData = await response.json();

      if (userData.length > 0) {
        localStorage.setItem('userData', JSON.stringify(userData));

        dispatch({ type: 'SAVE_USER_DATA', payload: userData });
      } else {
        console.error('User not found');
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user data', error);
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: 'Error fetching user data' });
    }
  };
export const setAlbumPhotoIndex = (albumId: number, index: number) => ({
  type: 'SET_ALBUM_PHOTO_INDEX',
  payload: { albumId, index },
});
export const setSection = (section: string) => ({
  type: 'SET_SECTION',
  payload: section,
});
