/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useCallback, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom';
import routes from './routes';
import LoginPage from 'containers/LoginPage/Loadable';
import GlobalStyle from '../../global-styles';
import PrivateRoute from './PrivateRoute';
import { makeSelectRole } from '../LoginPage/selectors';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// max-width: calc(768px + 16px * 5);
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { loginSuccess } from '../LoginPage/actions';
import useFilterMap from '../../components/hooks/useFilterMap';
import Layouts from '../Layouts';

function App({ role }) {
  const dataRoute = useFilterMap(role);
  const renderRoute = () => {
    let result = null;
    //filter

    result = dataRoute.map((route, index) => {
      return (
        <Route key={route.name} path={route.path} exact={route.exact}>
          <route.component />
        </Route>
      );
    });
    return result;
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <Layouts>{renderRoute()}</Layouts>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(withConnect)(App);
