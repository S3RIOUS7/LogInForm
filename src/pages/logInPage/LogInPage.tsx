import '../logInPage/login.scss';
import logInArt from '../../assets/LoginArt.svg';
import Input from '../../components/base/input/Input';
import Button from '../../components/base/button/Button';

import {
  fetchDataByUsername,
  setUsername,
  setUsernameInput,
  fetchAlbumsByUserId,
  fetchPostsByUserId,
} from '../../utils/redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/reducers';
import { AppDispatch } from '../../utils/redux/store';

interface LogInPageProps {
  userData: any;
  usernameInput: string;
}

const LogInPage: React.FC<LogInPageProps> = ({ userData }) => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const usernameInput = useSelector((state: RootState) => state.auth.usernameInput);

  const signInButtonClick = async () => {
    try {
      dispatch(fetchDataByUsername(usernameInput));

      const userExists = userData.some(
        (user: { username: string }) => user.username === usernameInput,
      );

      if (userExists) {
        await Promise.all([
          dispatch(fetchAlbumsByUserId(userData[0].id)),
          dispatch(fetchPostsByUserId(userData[0].id)),
        ]);

        navigate('/MainPage');
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error handling sign in button click', error);
    }
  };
  const inputChange = (value: string) => {
    dispatch(setUsernameInput(value));
    dispatch(setUsername(value));
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
          User Name
          <Input
            placeholder={'Your Name'}
            onChange={inputChange}
            value={usernameInput}
            type={'text'}
          />
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

export default LogInPage;
