import React, { Component } from 'react';
import axios from 'axios';

 export default class CustomerManagement extends Component {

    constructor(props) { 
        super(props);  

        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeCustomerStatus = this.onChangeCustomerStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is how u create variables in react
        this.state = { 
            discount: "",
            customerStatus: "",
            discounts: []
        }
    }
   
    componentDidMount() {  //react life cycle method automatically called right before anything displays the page
        axios.get("/api/customers/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    discount: response.data.discount,
                    customerStatus: response.data.customerStatus,
                    
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        
        axios.get('/api/discounts/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        discounts: response.data.map(discount => discount.discountName), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        discount: response.data[0].discountName
                    })
                }
            })
    }

    onChangeCustomerStatus(e) { 
        this.setState( { customerStatus: e.target.value });
    }

    onChangeDiscount(e) { 
        this.setState( { discount: e.target.value });
    }

    onSubmit(e) {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const customer = {

            discount: this.state.discount,
            customerStatus: this.state.customerStatus
        };

        //Add item via Additem action
        axios.post('/api/customers/manager/update/'+ this.props.match.params.id, customer) 
            .then(res => console.log(res.data));

        window.location = '/manager';

    };


    render() {
        return(
            //form code 
            <div>
                <h3>Customer Management</h3>
                <form onSubmit={this.onSubmit}> 
                <div className="form-group"> 
                    <label>Discount: </label>
                    <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.discount}
                            onChange={this.onChangeDiscount}>
                                {
                                    this.state.discounts.map(function(discountName) { //javascript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={discountName}
                                        value={discountName}>{discountName}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group"> 
                        <label>Customer Status: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.customerStatus}
                            onChange={this.onChangeCustomerStatus}>
                                <option>Regular</option>
                                <option>Valued</option>
                                </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register Customer" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}
