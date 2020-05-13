import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sales = props => ( //functional react component, no state or lifecycle methods
    <tr>
        <td>{props.sale.seller}</td>
        <td>{props.sale.customer}</td>
        <td>{props.sale.blankID}</td>
        <td>{props.sale.coupons}</td>
        <td>{props.sale.date}</td>
        <td>{props.sale.currency}</td>
        <td>{props.sale.method}</td>
        <td>{props.sale.ticketAmount}</td>
        <td>
             <a href="#" onClick={() => {props.deleteSale(props.sale._id)}}>delete</a>
        </td>
    </tr>
)

export default class TicketList extends Component {

    constructor(props){
        super(props);

        this.deleteSale = this.deleteSale.bind(this);
        this.state = {sales: [] };
    }

    componentDidMount() {
        axios.get('/api/sales/')
            .then(response => {
                this.setState({sales: response.data}) //return all the fields of exercises
            })
            .catch((error) => {
                console.log("Error: " + error)
            })
    }

    deleteSale(id){
        axios.delete('/api/sales/'+id)
            .then(res => console.log(res.data)); //this says exercise deleted from routes

        this.setState({
            sales: this.state.sales.filter(el => el._id !== id)
        })
    }

    ticketList() {
        return this.state.sales.map(currentsale => {
            console.log(currentsale);

            return <Sales sale={currentsale} deleteSale={this.deleteSale} key={currentsale._id}/>;
        })
    }
 
    render() {

        return(
            <div>
                <h3>Tickets</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Seller</th>
                            <th>Customer</th>
                            <th>Blank ID</th>
                            <th>Coupons</th>
                            <th>Date</th>
                            <th>Currency</th>
                            <th>Method</th>
                            <th>Ticket Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ticketList() } 
                    </tbody>
                </table>
            </div>
        )
    }

}
