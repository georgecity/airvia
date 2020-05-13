import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


class RecordSale extends Component {

    constructor(props) { 
        super(props);  

        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onChangeTicketAmount = this.onChangeTicketAmount.bind(this);
        this.onChangeBlankID = this.onChangeBlankID.bind(this);
        this.onChangeCoupons = this.onChangeCoupons.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeMethod = this.onChangeMethod.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
        this.onChangeCurrencyRate = this.onChangeCurrencyRate.bind(this);
        this.onChangeComission = this.onChangeComission.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangePayment = this.onChangePayment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is how u create variables in react
        this.state = { 
            seller: this.props.auth.user.name,
            customer: "",
            ticketAmount: "", 
            blankID: "",
            couponsText: "",
            coupons: [],
            date: new Date(),
            method: "Cash",
            currency: "GBP",
            currencyRate: "",
            comission: "",
            discount: "",
            payment: "",
            currencies: [],
            comissions: [],
            discounts: [],
            customers: [],
            payments: [],
            blanks: [],
            blank:"",
            status: "Sold",
            owner: "",
            id: ""
        }
    }

    componentDidMount() {  //react life cycle method automatically called right before anything displays the page
        axios.get('/api/currency/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        currencies: response.data.map(currencyRate => currencyRate.currencyRate), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        currencyRate: response.data[0].currencyRate
                    })
                }
            })

            axios.get('/api/comission/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        comissions: response.data.map(comission => comission.comission), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        comission: response.data[0].comission
                    })
                }
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

            axios.get('/api/customers/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        customers: response.data.map(customer => customer.name), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        customer: response.data[0].name
                    })
                }
            })

            axios.get('/api/payment/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        payments: response.data.map(payment => payment.cardNumber), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        payment: response.data[0].cardNumber
                    })
                }
            })

            axios.get('/api/stock/sales')
            .then(response => {
                if (response.data.length > 0 ){
                    this.setState({
                        blanks: response.data.map(blank => blank.blankID), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        blank: response.data[0].blankID,
                        owner: response.data[0].owner,
                        id: response.data[0]._id

                    })
                }
            })

    }
   
    onChangeCustomer(e) { 
        this.setState( { customer: e.target.value });
    }

    onChangeTicketAmount(e) { 
        this.setState( { ticketAmount: e.target.value });
    }

    onChangeBlankID(e) { 
        this.setState( { blankID: e.target.value});

    }

    onChangeCoupons(e) { 
        this.setState( { couponsText: e.target.value, coupons :this.state.couponsText.split(", ") });
    }
    
    onChangeDate(date) { 
        this.setState( { date: date });
    }

    onChangeMethod(e) { 
        this.setState( { method: e.target.value });
    }

    onChangeCurrency(e) { 
        this.setState( { currency: e.target.value });
    }

    onChangeCurrencyRate(e) { //hardcode for now
        this.setState( { currencyRate: e.target.value });
    }

    onChangeComission(e) { 
        this.setState( { comission: e.target.value });
    }

    onChangeDiscount(e) { 
        this.setState( { discount: e.target.value });
    }

    onChangePayment(e) { 
        this.setState( { payment: e.target.value });
    }

    onSubmit(e) {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const newSale = {
            seller: this.state.seller,
            customer: this.state.customer,
            ticketAmount: this.state.ticketAmount,
            blankID: this.state.blankID,
            coupons: this.state.coupons,
            date: this.state.date,
            method: this.state.method,
            currency: this.state.currency,
            currencyRate: this.state.currencyRate,
            comission: this.state.comission,
            discount: this.state.discount,
            payment: this.state.payment,
        };

        let id = this.state.id
        const blank = {
            status: this.state.status,
            owner: this.state.owner
        }
        //Add item via Additem action
        axios.post('/api/sales/add', newSale) 
            .then(res => console.log(res.data));

            console.log(id);

        axios.post('/api/stock/update/'+id, blank) 
            .then(res => console.log(res.data));
            
        window.location = '/advisor';

    };


    render() {
        return(
            //form code 
            <div>
                <h3>Record Sale</h3>
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
                        <label>BlankID: </label>
                        <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.blankID}
                            onChange={this.onChangeBlankID}>
                                {
                                    this.state.blanks.map(function(blankID) { //jaavscript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={blankID}
                                        value={blankID}>{blankID}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group"> 
                    <label>Coupons: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.couponsText}
                        onChange={this.onChangeCoupons}
                        />    
                    </div>        
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group"> 
                        <label>Currency: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.currency}
                            onChange={this.onChangeCurrency}>
                                <option>GBP</option>
                                <option>USD</option>
                                </select>
                    </div>
                    <div className="form-group"> 
                        <label>Currency Rate: </label>
                        <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.currency}
                            onChange={this.onChangeCurrencyRate}>
                                {
                                    this.state.currencies.map(function(currrencyRate) { //jaavscript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={currrencyRate}
                                        value={currrencyRate}>{currrencyRate}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group"> 
                        <label>Comission: </label>
                        <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.comission}
                            onChange={this.onChangeComission}>
                                {
                                    this.state.comissions.map(function(comission) { //jaavscript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={comission}
                                        value={comission}>{comission}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Discount: </label>
                        <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.discount}
                            onChange={this.onChangeDiscount}>
                                {
                                    this.state.discounts.map(function(discountName) { //jaavscript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={discountName}
                                        value={discountName}>{discountName}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Method: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.method}
                            onChange={this.onChangeMethod}>
                                <option>Cash</option>
                                <option>Card</option>
                                <option>Pay Later</option>
                                </select>
                    </div>

                            {(this.state.method === "Card") > 0 && (
                    <div className="form-group"> 
                    <label>Payment: </label>
                    <select ref="userInput" //dropdown menu /different methods inside brackets
                        required
                        className="form-control"
                        value={this.state.payment}
                        onChange={this.onChangePayment}>
                            {
                                this.state.payments.map(function(cardNumber) { //jaavscript fucntion for users returned form mongo which gives us options
                                    return <option
                                    key={cardNumber}
                                    value={cardNumber}>{cardNumber}
                                    </option>
                                })
                            }
                        </select>
                </div>
                        )}

                    <div className="form-group"> 
                        <label>Ticket Amount: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ticketAmount}
                            onChange={this.onChangeTicketAmount}
                            />       
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Record Sale" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}

RecordSale.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(RecordSale);