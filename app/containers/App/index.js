/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useCallback, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import LoginPage from 'containers/LoginPage/Loadable';
import GlobalStyle from '../../global-styles';
import PrivateRoute from './privateRoute';
import { makeSelectRole } from '../LoginPage/selectors';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';

// max-width: calc(768px + 16px * 5);
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { loginSuccess } from '../LoginPage/actions';

function App({ role, autoLogin }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      autoLogin(token);
      const decoded = jwt(token, { header: true });
      const { exp } = decoded;
      if (new Date(exp * 1000) < Date.now()) {
        console.log('blabla');
      }
    }
  }, []);

  const renderRoute = () => {
    let result = null;
    //filter
    result = routes
      .filter(matchRoute => {
        return matchRoute.role.includes(role);
      })
      .map((route, index) => {
        return (
          <PrivateRoute
            key={index}
            path={route.path}
            component={route.component}
            layout={route.layout}
          />
        );
      });
    return result;
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        {renderRoute()}
        <PrivateRoute path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
});

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: data => dispatch(loginSuccess(data)),
  };
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(App);
