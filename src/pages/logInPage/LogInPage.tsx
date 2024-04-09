import '../logInPage/login.scss';
import logInArt from '../../assets/LoginArt.svg';
import Input from '../../components/base/input/Input';
import Button from '../../components/base/button/Button';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  fetchDataByUsername,
  saveUserData,
  setUsername,
  setUsernameInput,
  fetchAlbumsByUserId,
  fetchPostsByUserId,
} from '../../utils/redux/actions';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../utils/redux/reducers';

interface LogInMenuProps {
  setUsernameInput: (username: string) => void;
  setUsername: (username: string) => void;
  fetchDataByUsername: (username: string) => void;
  saveUserData: (userData: Array<any>) => void;
  userData?: Array<any>;
  usernameInput: string;
  fetchAlbumsByUserId: (userId: number) => Promise<void>;
  fetchPostsByUserId: (userId: number) => Promise<void>;
}

const LogInMenu: React.FC<LogInMenuProps> = ({
  setUsernameInput,
  setUsername,
  fetchDataByUsername,
  userData,
  usernameInput,
  fetchAlbumsByUserId,
  fetchPostsByUserId,
}) => {
  const navigate = useNavigate();

  const onUsernameInputChange = (value: string) => {
    setUsernameInput(value);
    setUsername(value);
  };

  const signInButtonClick = async () => {
    try {
      await fetchDataByUsername(usernameInput);

      const userExists = userData?.some(
        (user: { username: string }) => user.username === usernameInput,
      );

      if (userExists && userData && userData.length > 0) {
        await Promise.all([
          fetchAlbumsByUserId(userData[0].id),
          fetchPostsByUserId(userData[0].id),
        ]);

        navigate('/MainPage');
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error handling sign in button click', error);
    }
  };

  return (
    <div className="logInMenuMainContainer">
      <div className="logInMenuContainer">
        <div className="titledescribe">
          <h2>Welcome Back</h2>
          <p>
            Today is a new day. It's your day. You shape it. Sign in to start managing your
            projects.
          </p>
        </div>
        <div className="inputname">
          Email
          <Input
            placeholder={'yourEmail@email.com'}
            onChange={onUsernameInputChange}
            value={usernameInput}
            type={'text'}
          />
        </div>

        <div className="forgotPassword">
          <p>Forgot Password?</p>
        </div>

        <Button children={'Sign In'} onClick={signInButtonClick} buttonStyle="primary" />
        <div className="Or">
          <div className="line"></div> Or <div className="line"></div>
        </div>
        <Button children={'Sign In with Google'} buttonStyle="secondary" />
        <Button children={'Sign In with Facebook'} buttonStyle="secondary" />
        <div className="signUpQuestion"> Don't you have an account? Sign up. </div>
      </div>
      <div className="lodInMenuArt">
        <img src={logInArt} alt="art" />
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  userData: state.auth.userData || [],
  usernameInput: state.auth.usernameInput,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUsername: (username: string) => dispatch(setUsername(username)),
  fetchDataByUsername: (username: string) => dispatch(fetchDataByUsername(username) as any),
  saveUserData: (userData: Array<any>) => dispatch(saveUserData(userData)),
  setUsernameInput: (username: string) => dispatch(setUsernameInput(username)),
  fetchAlbumsByUserId: (userId: number) => dispatch(fetchAlbumsByUserId(userId) as any),
  fetchPostsByUserId: (userId: number) => dispatch(fetchPostsByUserId(userId) as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInMenu);
