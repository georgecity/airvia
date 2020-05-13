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
              <div className="card-header">Welcome to the advisor page</div>
              <div className="card-body">
                Only Advisors can access this page
              </div>
              <div>
                  <Link to="/api/customers/register" className="nav-link">Register Customer</Link>
              </div>
              <div>
                  <Link to="/api/payment/add" className="nav-link">Record Payment</Link>
              </div>
              <div>
                  <Link to="/api/sales/add" className="nav-link">Record Sale</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
