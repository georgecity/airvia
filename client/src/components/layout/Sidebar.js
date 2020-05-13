import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

class Sidebar extends Component {

  render() {
    const { user } = this.props.auth;

    return (
      <div className="sticky-top">
        {/* Manager lvl */}
        { user.role === "Manager" || user.role === "Admin"  ? (
          <div className="list-group">
            <Link
              className="list-group-item list-group-item-action"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/manager"
            >
              Manager Page
            </Link>
            {/* Admin lvl only*/}
            {user.role === "Admin" ? (
              <Link
                className="list-group-item list-group-item-action"
                to="/admin"
              >
                Admin Page
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="list-group">
            {/* advisor lvl */}
            <Link
              className="list-group-item list-group-item-action"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
                className="list-group-item list-group-item-action"
                to="/advisor"
              >
                Advisor Page
              </Link>
          </div>
        )}
      </div>
    );
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
