import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";

export default class Manager extends Component {
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pl-md-0">
            <div className="card">
              <div className="card-header">Welcome to the manager page</div>
              <div className="card-body">
                The administrator and manager can access this page
              </div>
              <div>
                  <Link to="/api/comission/add" className="nav-link">Add Comission</Link>
              </div>
              <div>
                  <Link to="/api/discounts/add" className="nav-link">Add Discount</Link>
              </div>
              <div>
                  <Link to="/api/discounts/" className="nav-link">Discounts</Link>
              </div>
              <div>
                  <Link to="/api/comission/" className="nav-link">Comissions</Link>
              </div>
              <div>
                  <Link to="/api/customers/manager/" className="nav-link">Customers Management</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

