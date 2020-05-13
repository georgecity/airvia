import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class RegisterUser extends Component {

    constructor() { 
        super();  
        this.state = { 
            name: "", 
            address: "",
            contactNumber: "",
            email: "",
            password: "",
            password2: "",
            role: "Advisor",
            errors: {}
        };
    }

static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.errors!==prevState.errors){
      return { errors: nextProps.errors};
   }
   else return null;
 }

      componentDidUpdate(prevProps, nextProps) {
        if(prevProps.errors!==this.props.errors){
          //Perform some operation here
          this.setState({
            errors: nextProps.errors
          });
        }
      }
   
    onChange = e => { 
        this.setState( { [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            address: this.state.address,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            role: this.state.role
        };

        this.props.registerUser(newUser, this.props.history);
        window.location = '/admin';

    };


    render() {
        const { errors } = this.state;
        return(
            //form code 
            <div>
                <h3>Register User</h3>
                <form noValidate onSubmit={this.onSubmit}> 
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input type="text"
                            required
                            
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            id="name"
                            className={classnames("", {
                                invalid: errors.name
                            })}
                            />   
                            <span className="red-text">{errors.name}</span>    
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            required
                            
                            value={this.state.address}
                            onChange={this.onChange}
                            error={errors.address}
                            id="address"
                            className={classnames("", {
                                invalid: errors.address
                            })}
                            />
                            <span className="red-text">{errors.address}</span>
                    </div>
                    <div classaddress="form-group">
                        <label>Contact Number: </label>
                        <input 
                            type="text"
                    
                            value={this.state.contactNumber}
                            onChange={this.onChange}
                            error={errors.contactNumber}
                            id="contactNumber"
                            className={classnames("", {
                                invalid: errors.contactNumber
                            })}
                            />
                            <span className="red-text">{errors.contactNumber}</span>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                            type="email"
                            
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            id="email"
                            className={classnames("", {
                                invalid: errors.name
                            })}
                            />
                            <span className="red-text">{errors.email}</span>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            id="password"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                            />
                            <span className="red-text">{errors.password}</span>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                            id="password2"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                            />
                            <span className="red-text">{errors.password2}</span>
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <select ref="userInput"
                            required
                            value={this.state.role}
                            onChange={this.onChange}
                            error={errors.eole}
                            id="role"
                            className={classnames("", {
                                invalid: errors.role
                            })}>
                                <option>Advisor</option>
                                <option>Manager</option>
                                <option>Admin</option>
                        </select> 
                                <span className="red-text">{errors.role}</span>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}

RegisterUser.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(RegisterUser));
  

