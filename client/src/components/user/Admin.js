import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";

export default class Admin extends Component {
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pl-md-0">
            <div className="card">
              <div className="card-header">Welcome to the admin page</div>
              <div className="card-body">
                Only the Adminstrator can access this page
              </div>
              <div>
                  <Link to="/api/users/" className="nav-link">Users</Link>
              </div>
              <div>
                  <Link to="/api/stock/add" className="nav-link">Add Blank</Link>
              </div>
              <div>
                  <Link to="/api/users/register" className="nav-link">Register User</Link>
              </div>
              <div>
                  <Link to="/api/stock/range" className="nav-link">Add Blanks</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
