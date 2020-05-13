import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const IsManager = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        auth.user.role === "Manager" || auth.user.role === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

IsManager.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(IsManager);