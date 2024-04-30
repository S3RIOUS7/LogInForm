import '../logInPage/login.scss';
import logInArt from '../../assets/LoginArt.svg';
import Input from '../../components/base/input/Input';
import Button from '../../components/base/button/Button';

import { fetchDataByUsername, setUsernameInput } from '../../utils/redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/reducers';
import { AppDispatch } from '../../utils/redux/store';
import { useCallback } from 'react';

interface LogInPageProps {
  userData: any[];
}

const LogInPage: React.FC<LogInPageProps> = () => {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const usernameInput = useSelector((state: RootState) => state.auth.usernameInput);
  const updatedUserData = useSelector((state: RootState) => state.auth.userData);
  const signInButtonClick = useCallback(async () => {
    try {
      await dispatch(fetchDataByUsername(usernameInput));
      const userExists =
        updatedUserData &&
        updatedUserData.length > 0 &&
        updatedUserData.some((user: any) => user.username === usernameInput);

      console.log('User data:', updatedUserData);
      console.log('Username input:', usernameInput);
      console.log('User exists:', userExists);
      if (userExists) {
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        navigate('/Mainpage');
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error handling sign in button click', error);
    }
  }, [dispatch, navigate, usernameInput, updatedUserData]);

  const inputChange = (value: string) => {
    dispatch(setUsernameInput(value));
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
