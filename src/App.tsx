import HomePage from './pages/homePage/HomePage';
import LogInPage from './pages/logInPage/LogInPage';
import { Provider } from 'react-redux';
import store from './utils/redux/store';
import './App.scss';
import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="appContainer">
          <Routes>
            <Route path="/Homepage" element={<HomePage />} />
            <Route
              path="/Mainpage"
              element={<MainPage userData={[]} posts={[]} albums={[]} section={''} photos={[]} />}
            />
            <Route path="/" element={<LogInPage usernameInput={''} userData={[]} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

