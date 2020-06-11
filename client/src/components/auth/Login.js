import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "./Auth.css"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login-form" >
              <h1>
                <b>Login Below</b> 
              </h1>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="box-login">
              <label className="box-label" htmlFor="email">Email</label>
                <input onChange={this.onChange} value={this.state.email} error={errors.email} type="email" id="email" className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
              </div>
              <div className="box-login">
              <label className="box-label" htmlFor="password">Password</label>
                <input onChange={this.onChange} value={this.state.password} error={errors.password} type="password" id="password" className={classnames("", { invalid: errors.password || errors.passwordincorrect})}/>
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
              </div>
              <div className="login-button">
                <button type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                  Login
                </button>
              </div>
            </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
