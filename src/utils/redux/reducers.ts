interface AuthState {
  username: string;
  usernameInput: string;
  userData?: Array<any>;
}

export interface RootState {
  albumPhotoIndices: any;
  posts: { title: string; body: string }[]; // tipS
  albums: { title: string; body: string }[]; // tipS
  photos: { thumbnailUrl: string; title: string }[]; // tipS
  auth: AuthState;
  section: string;
  currentIndex: number;
}

const initialState: RootState = {
  auth: {
    username: '',
    usernameInput: '',
  },
  posts: [],
  albums: [],
  section: 'MyProfile',
  photos: [],
  currentIndex: 0,
  albumPhotoIndices: {},
};

type Action = { type: string; payload: any };

const rootReducer = (state: RootState = initialState, action: Action): RootState => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        auth: {
          ...state.auth,
          username: action.payload,
        },
      };
    case 'SET_USERNAME_INPUT':
      return {
        ...state,
        auth: {
          ...state.auth,
          usernameInput: action.payload,
        },
      };
    case 'SAVE_USER_DATA':
      return {
        ...state,
        auth: {
          ...state.auth,
          userData: action.payload,
        },
      };
    case 'SAVE_POSTS':
      return {
        ...state,
        posts: action.payload,
      };

    case 'SET_SECTION':
      return {
        ...state,
        section: action.payload,
      };

    case 'SAVE_ALBUMS':
      return {
        ...state,
        albums: action.payload,
      };

    case 'SAVE_PHOTOS':
      return {
        ...state,
        photos: action.payload,
      };
    case 'SET_CURRENT_PHOTO_INDEX':
      return {
        ...state,
        currentIndex: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        section: 'LogInMenu',
        auth: {
          ...initialState.auth,
        },
      };

    case 'SET_ALBUM_PHOTO_INDEX':
      return {
        ...state,
        albumPhotoIndices: {
          ...state.albumPhotoIndices,
          [action.payload.albumId]: action.payload.index,
        },
      };

    case 'FETCH_DATA_FAILURE':
      return state;
    default:
      return state;
  }
};
export default rootReducer;
