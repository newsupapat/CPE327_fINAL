import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Loadable from 'react-loadable';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import 'asset/vendor/nucleo/css/nucleo.css';
import 'asset/scss/argon-design-system-react.scss';
import 'asset/css/app.css';

// View
import Loading from 'components/Loading/Loader';

// Core Components
import Navbar from 'components/Navbars';

import PrivateRoute from './PrivateRoute';

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom right, #070630 0%, #060454 100%);
  min-height: 100vh;
  z-index: 9999;
`;

const HomePage = Loadable({
  loader: () => import('./views/HomePage'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const LoginPage = Loadable({
  loader: () => import('./views/loginPage'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const NotiPage = Loadable({
  loader: () => import('./views/notification'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          path="/"
          exact
          component={props => <HomePage {...props} />}
        />
        <PrivateRoute
          path="/notification"
          exact
          component={props => <NotiPage {...props} />}
        />
        {/* <PrivateRoute path="/login" exact component={LoginPage} /> */}
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
