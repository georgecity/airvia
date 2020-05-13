import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pl-md-0">
            <div className="card">
              <div className="card-header">Welcome to the dashboard</div>
              <div className="card-body">
                Every user that is authenticated can access the dashboard
              </div>
              <div>
                  <Link to="/api/currency/add" className="nav-link">Add Currency</Link>
              </div>
              <div>
                  <Link to="/api/customers/" className="nav-link">Customers</Link>
              </div>
              <div>
                  <Link to="/api/sales/" className="nav-link">Tickets List</Link>
              </div>
              <div>
                  <Link to="/api/stock/" className="nav-link">Blank Stock</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

