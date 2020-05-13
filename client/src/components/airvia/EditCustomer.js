import React, { Component } from 'react';
import axios from 'axios';
export default class EditExercise extends Component {

    constructor(props) { 
        super(props);  

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            name: " ", 
            address: " ",
            email: " ",
            contactNumber: 0,
            customers: [] 
        }
    }

    componentDidMount() {  
        axios.get("/api/customers/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    email: response.data.email,
                    contactNumber: response.data.contactNumber,
                    
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

    onChangeEmail(e) {           
        this.setState({
            email: e.target.email
        });
    }

    onChangeContactNumber(e) {
        this.setState({
            contactNumber: e.target.value
        });
    }

    onSubmit(e) { 
        e.preventDefault(); 
        
        const customer = {            
            name: this.state.name, 
            address: this.state.address,
            email: this.state.email,
            contactNumber: this.state.contactNumber,

        }

        console.log(customer); 

        axios.post('/api/customers/update/'+this.props.match.params.id, customer) 
            .then(res => console.log(res.data));

        window.location = '/api/customers'; 
    }

    render() {
        return(
            <div>
                <h3>Edit Customer Details</h3>
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
                        <input type="text"
                            required
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
                            value={this.state.onChangeContactNumber}
                            onChange={this.onChangeContactNumber}
                            />
                    </div>
                    

                    <div className="form-group">
                        <input type="submit" value="Edit Customer Details" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}