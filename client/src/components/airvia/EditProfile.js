import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class EditProfile extends Component {

    constructor(props) { 
        super(props);  

        this.state = { 
            name: "", 
            address: "",
            contactNumber: "",
            role: this.props.auth.user.role,
            users: [] ,
            errors: {}
        }
    }

    componentDidMount() {  
        axios.get("/api/users/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    contactNumber: response.data.contactNumber,
                    
                })
            })
            .catch(function (error) {
                console.log(error);
            })
       
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors!==prevState.errors){
          return { errors: nextProps.errors};
       }
       else return null;
     }
    
          componentDidUpdate(prevProps, nextProps) {
            if(prevProps.errors!==this.props.errors){
              this.setState({
                errors: nextProps.errors
              });
            }
          }

    onChange = e => { 
        this.setState( { [e.target.id]: e.target.value });
    }

    onSubmit = e => { 
        e.preventDefault(); 
        
        const user = {            
            name: this.state.name, 
            address: this.state.address,
            contactNumber: this.state.contactNumber,
            role: this.state.role
        }

        console.log(user); 

        axios.post('/api/users/update/'+this.props.match.params.id, user) 
            .then(res => console.log(res.data));

        window.location = '/dashboard'; 
    }

    render() {
        const { errors } = this.state;
        return(
            <div>
                <h3>Edit Profile</h3>
                <form noValidate onSubmit={this.onSubmit}> 
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
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
                            className="form-control"
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
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input 
                            type="text"
                            className="form-control"
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
                        <input type="submit" value="Edit Profile" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}

EditProfile.propTypes = {
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
  )(withRouter(EditProfile));