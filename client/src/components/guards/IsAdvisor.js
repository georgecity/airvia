import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const IsAdvisor = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        auth.user.role === "Advisor" ? (
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

IsAdvisor.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps)(IsAdvisor);
