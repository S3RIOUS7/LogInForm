import LogInPage from './pages/logInPage/LogInPage';
import { Provider } from 'react-redux';
import store from './utils/redux/store';
import './App.scss';
import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyProfile from './pages/myProfile/MyProfile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="appContainer">
          <Routes>
            <Route path="/Userprofile" element={<MyProfile userData={[]} />} />
            <Route path="/Mainpage" element={<MainPage userData={[]} />} />
            <Route path="/" element={<LogInPage userData={[]} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

