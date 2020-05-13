import React, { Component } from 'react';
import axios from 'axios';

 export default class RegisterCustomer extends Component {

    constructor(props) { 
        super(props);  

        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is how u create variables in react
        this.state = { 
            name: "", 
            address: "",
            email: "",
            contactNumber: "",
            discount: "",
            customerStatus: "Regular"
        }
    }
   
    onChangeName(e) { 
        this.setState( { name: e.target.value });
    }

    onChangeAddress(e) { 
        this.setState( { address: e.target.value });
    }

    onChangeEmail(e) { 
        this.setState( { email: e.target.value });
    }

    onChangeContactNumber(e) { 
        this.setState( { contactNumber: e.target.value });
    }

    onSubmit(e) {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const newCustomer = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            contactNumber: this.state.contactNumber,
            discount: this.state.discount,
            customerStatus: this.state.customerStatus
        };

        //Add item via Additem action
        axios.post('/api/customers/register', newCustomer) 
            .then(res => console.log(res.data));

        window.location = '/advisor';

    };


    render() {
        return(
            //form code 
            <div>
                <h3>Register Customer</h3>
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />       
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                            />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                            type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                    </div>
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.contactNumber}
                            onChange={this.onChangeContactNumber}
                            />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register Customer" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}
