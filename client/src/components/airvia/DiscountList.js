import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Discount = props => ( //functional react component, no state or lifecycle methods
    <tr>
        <td>{props.discount.discountName}</td>
        <td>{props.discount.type}</td>
        <td>{props.discount.discount}</td>
        <td>{props.discount.condition}</td>
        <td>
           <a href="#" onClick={() => {props.deleteDiscount(props.discount._id)}}>Delete</a>
        </td>
    </tr>
)

export default class DiscountList extends Component {

    constructor(props){
        super(props);

        this.deleteDiscount = this.deleteDiscount.bind(this);
        this.state = {discounts: [] };
    }

    componentDidMount() {
        axios.get('/api/discounts/')
            .then(response => {
                this.setState({discounts: response.data}) //return all the fields of exercises
            })
            .catch((error) => {
                console.log("Error: " + error)
            })
    }

    deleteDiscount(id){
        axios.delete('/api/discounts/'+id)
            .then(res => console.log(res.data)); //this says exercise deleted from routes

        this.setState({
            discounts: this.state.discounts.filter(el => el._id !== id)
        })
    }

    discountList() {
        return this.state.discounts.map(currentdiscount => {
            console.log(currentdiscount);

            return <Discount discount={currentdiscount} deleteDiscount={this.deleteDiscount} key={currentdiscount._id}/>;
        })
    }
 
    render() {

        return(
            <div>
                <h3>Discounts</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Discount Name</th>
                            <th>Type</th>
                            <th>Discount (%)</th>
                            <th>Condition</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.discountList() } 
                    </tbody>
                </table>
            </div>
        )
    }

}