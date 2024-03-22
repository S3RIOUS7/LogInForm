interface AuthState {
  email: string;
  password: string;
  username: string;
  usernameInput: string;
  userData?: Array<any>;
}

export interface RootState {
  posts: { title: string; body: string }[];
  albums: { title: string; body: string }[];
  photos: { thumbnailUrl: string; title: string }[];
  auth: AuthState;
  section: string;
  currentIndex: number;
}

const initialState: RootState = {
  auth: {
    email: '',
    password: '',
    username: '',
    usernameInput: '',
  },
  posts: [],
  albums: [],
  section: 'MyProfile',
  photos: [],
  currentIndex: 0,
};

type Action = { type: string; payload: any };

const rootReducer = (state: RootState = initialState, action: Action): RootState => {
  switch (action.type) {
    case 'SET_PASSWORD':
      return {
        ...state,
        auth: {
          ...state.auth,
          password: action.payload,
        },
      };
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
      };

    case 'FETCH_DATA_FAILURE':
      return state;
    default:
      return state;
  }
};
export default rootReducer;
