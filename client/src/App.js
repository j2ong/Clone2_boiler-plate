import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        {/*
          [LandingPage] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>
          이라는 오류가 발생했으나, react를 versionUp하고 태그형식을 바꾸니 왠지모르게 해결이 되었다.
        */}
        <Switch>
        <Route exact path="/" component={Auth(LandingPage, null )  } />
          <Route exact path="/login" component={Auth(LoginPage, false) } />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;