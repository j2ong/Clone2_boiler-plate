import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        {/*
          [LandingPage] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>
          이라는 오류가 발생했으나, react를 versionUp하고 태그형식을 바꾸니 왠지모르게 해결이 되었다.
        */}
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} /> //
        </Routes>
      </div>
    </Router>
  );
}

export default App;