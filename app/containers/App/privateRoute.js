import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLoggin } from '../LoginPage/selectors';
const PrivateRoute = ({ children, isLoggin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggin ? children : <Redirect to="/login" />;
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isLoggin: makeSelectIsLoggin(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);
export default compose(withConnect)(PrivateRoute);
