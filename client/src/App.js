import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/layout/Navbar";
import RegisterUser from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from 'react-redux';
import store from './store';
//import PrivateRoute from "./components/private-route/PrivateRoute.js";
import Dashboard from "./components/dashboard/Dashboard";
//
import NotAuth from "./components/guards/NotAuth";
import IsAuth from "./components/guards/IsAuth";
import IsManager from "./components/guards/IsManager";
import IsAdmin from "./components/guards/IsAdmin";
import IsAdvisor from "./components/guards/IsAdvisor";

import Manager from "./components/user/Manager";
import Admin from "./components/user/Admin";
import Advisor from "./components/user/Advisor";

//
import BlankStock from "./components/airvia/BlankStock";
import AddBlank from "./components/airvia/AddBlank";
import RecordSale from "./components/airvia/RecordSale";
import CustomerList from "./components/airvia/CustomerList";
import AddCurrency from "./components/airvia/AddCurrencyRate";
import RegisterCustomer from "./components/airvia/RegisterCustomer";
import CustomerManagement from "./components/airvia/CustomerManagement";
import ManagerCustomerList from "./components/airvia/ManagerCustomerList";
import ManageStock from "./components/airvia/ManageStock";

import UserList from "./components/airvia/UserList";
import RecordPayment from "./components/airvia/RecordPayment";
import EditUser from "./components/airvia/EditUser";
import EditProfile from "./components/airvia/EditProfile";
import EditCustomer from "./components/airvia/EditCustomer";
import AddComission from "./components/airvia/AddComission";
import AddDiscount from "./components/airvia/AddDiscount";
import DiscountList from "./components/airvia/DiscountList";
import ComissionList from "./components/airvia/ComissionList";
import AddBlanks from "./components/airvia/BlankRange";

//
import Home from "./components/layout/Home";
import TicketList from './components/airvia/TicketList';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router> 
                  <div className="App">
                      <Navbar />
                      <br/>
                      <Switch>
                        {/*airvia routes */}
                        <IsAuth path="/api/customers/"  exact component={CustomerList} />
                        <IsAuth path="/api/currency/add"  component={AddCurrency} />
                        <IsAuth path="/api/sales/add"  component={RecordSale} />
                        <IsAuth path="/api/sales/"  component={TicketList} />
                        <IsAuth path="/api/customers/register"  component={RegisterCustomer} />
                        <IsAuth path="/api/users/register"  component={RegisterUser} />
                        <IsAuth path="/api/stock/"  exact component={BlankStock} />
                        <IsAuth path="/api/stock/add"  component={AddBlank} />
                        <IsAuth path="/api/stock/range"  component={AddBlanks} />
                        <IsAuth path="/api/customers/manager"  component={ManagerCustomerList} />
                        <IsAuth path="/api/customers/manage/:id"  component={CustomerManagement} />
                        <IsAuth path="/api/stock/manage/:id"  component={ManageStock} />

                        <IsAuth path="/api/users/"  exact component={UserList} />
                        <IsAuth path="/api/payment/add"  component={RecordPayment} />
                        <IsAuth path="/api/users/edit/:id"  component={EditUser} />
                        <IsAuth path="/api/customers/edit/:id"  component={EditCustomer} />
                        <IsAuth path="/api/comission/add"  exact component={AddComission} />
                        <IsAuth path="/api/discounts/add"  exact component={AddDiscount} />
                        <IsAuth path="/api/comission/"  exact component={ComissionList} />
                        <IsAuth path="/api/discounts/"  exact component={DiscountList} />
                        <IsAuth path="/api/users/profile/:id"  exact component={EditProfile} />


                        <NotAuth exact path="/api/users/login" component={Login} />
                        <Route exact path="/" component={Home} />
                        <IsAuth exact path="/dashboard" component={Dashboard} />
                        <NotAuth exact path="/login" component={Login} />
                        <IsManager exact path="/manager" component={Manager} />
                        <IsAdmin exact path="/admin" component={Admin} />
                        <IsAdvisor exact path="/advisor" component={Advisor} />
                      </Switch>
                  </div>
                </Router>
            </Provider>
          );
    }
  
    
}

export default App;