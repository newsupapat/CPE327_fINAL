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
const GroupPage = Loadable({
  loader: () => import('./views/Group'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const Bill = Loadable({
  loader: () => import('./views/Bill'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const BillDetail = Loadable({
  loader: () => import('./views/BillDetail'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});

const NotiPlanner = Loadable({
  loader: () => import('./views/NotiPlanner'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const SummaryBills = Loadable({
  loader: () => import('./views/summaryBill'),

  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
});
const Reg = Loadable({
  loader: () => import('./views/Regis'),
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
        <PrivateRoute
          path="/addGroup"
          exact
          component={props => <GroupPage {...props} />}
        />
        <PrivateRoute
          path="/billdetail"
          exact
          component={props => <BillDetail {...props} />}
        />
        <PrivateRoute
          path="/addbill"
          exact
          component={props => <Bill {...props} />}
        />

        <PrivateRoute
          path="/notiplanner"
          exact
          component={props => <NotiPlanner {...props} />}
        />
        <Route
          path="/SummaryBills/:billid"
          exact
          component={props => <SummaryBills {...props} />}
        />
        <Route
          path="/reg"
          exact
          component={props => <Reg {...props} />}
        />
        {/* <PrivateRoute path="/login" exact component={LoginPage} /> */}
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
