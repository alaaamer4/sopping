import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !isLoading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps)(PrivateRoute);
