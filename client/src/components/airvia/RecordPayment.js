import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


 export default class RecordSale extends Component {

    constructor(props) { 
        super(props);  
        
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);
        this.onChangeExpiryDate = this.onChangeExpiryDate.bind(this);
        this.onChangeBillingAddress = this.onChangeBillingAddress.bind(this);
        this.onChangeNameOnCard = this.onChangeNameOnCard.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is how u create variables in react
        this.state = { 
            customer: "", 
            cardNumber: "",
            cvv: "",
            expiryDate: new Date(),
            billingAddress: "",
            nameOnCard: "",
            customers: []
        }
    }

    componentDidMount() {  //react life cycle method automatically called right before anything displays the page
        axios.get('/api/customers/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        customers: response.data.map(customer => customer.name), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        customer: response.data[0].name
                    })
                }
            })
    }
   
    onChangeCustomer(e) { 
        this.setState( { customer: e.target.value });
    }

    onChangeCardNumber(e) { 
        this.setState( { cardNumber: e.target.value });
    }

    onChangeCVV(e) { 
        this.setState( { cvv: e.target.value });
    }

    onChangeExpiryDate(date) { 
        this.setState( { expiryDate: date });
    }

    onChangeBillingAddress(e) { 
        this.setState( { billingAddress: e.target.value });
    }
    onChangeNameOnCard(e) { 
        this.setState( { nameOnCard: e.target.value });
    }

    onSubmit(e) {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const newPayment = {
            customer: this.state.customer,
            cardNumber: this.state.cardNumber,
            cvv: this.state.cvv,
            expiryDate: this.state.expiryDate,
            billingAddress: this.state.billingAddress,
            nameOnCard: this.state.nameOnCard,        
        };

        //Add item via Additem action
        axios.post('/api/payment/add', newPayment) 
            .then(res => console.log(res.data));

        window.location = '/advisor';

    };


    render() {
        return(
            //form code 
            <div>
                <h3>Record Payment Method</h3>
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group"> 
                    <label>Customer: </label>
                    <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.customer}
                            onChange={this.onChangeCustomer}>
                                {
                                    this.state.customers.map(function(customer) { //jaavscript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={customer}
                                        value={customer}>{customer}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Card Number: </label> 
                        <input type="text"
                            maxlength="19"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            required
                            className="form-control"
                            value={this.state.cardNumber}
                            onChange={this.onChangeCardNumber}
                            />
                    </div>
                    <div className="form-group">
                        <label>CVV: </label>
                        <input 
                            type="password"
                            maxlength="3"
                            className="form-control"
                            value={this.state.cvv}
                            onChange={this.onChangeCVV}
                            />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.expiryDate}
                                onChange={this.onChangeExpiryDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Billing Address: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.billingAddress}
                            onChange={this.onChangeBillingAddress}
                            />
                    </div>
                    <div className="form-group"> 
                        <label>Name On Card: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameOnCard}
                            onChange={this.onChangeNameOnCard}
                            />
                    </div>
    
                    <div className="form-group">
                        <input type="submit" value="Record Payment Method" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}

