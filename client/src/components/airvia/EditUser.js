import React, { Component } from 'react';
import axios from 'axios';
export default class EditUser extends Component {

    constructor(props) { 
        super(props);  

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            name: "", 
            address: "",
            contactNumber: "",
            role: "",
            users: [] 
        }
    }

    componentDidMount() {  
        axios.get("/api/users/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    contactNumber: response.data.contactNumber,
                    role: response.data.role,
                    
                })
            })
            .catch(function (error) {
                console.log(error);
            })
       
    }

    onChangeName(e) { 
        this.setState( {   
            name: e.target.value
        });
    }
    
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeContactNumber(e) {
        this.setState({
            contactNumber: e.target.value
        });
    }

    onChangeRole(e) {           
        this.setState({
            role: e.target.role
        });
    }

    onSubmit(e) { 
        e.preventDefault(); 
        
        const user = {            
            name: this.state.name, 
            address: this.state.address,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
            role: this.state.role
        }

        console.log(user); 

        axios.post('/api/users/update/'+this.props.match.params.id, user) 
            .then(res => console.log(res.data));

        window.location = '/api/users/'; 
    }

    render() {
        return(
            <div>
                <h3>Edit User Details</h3>
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
                        <label>Contact Number: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.contactNumber}
                            onChange={this.onChangeContactNumber}
                            />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.role}
                            onChange={this.onChangeRole}
                            />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit User Details" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}