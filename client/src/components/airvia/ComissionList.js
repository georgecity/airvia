import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Comission = props => ( //functional react component, no state or lifecycle methods
    <tr>
        <td>{props.comission.creator}</td>
        <td>{props.comission.comission}</td>
        <td>
             <a href="#" onClick={() => {props.deleteComission(props.comission._id)}}>Delete</a>
        </td>
    </tr>
)

export default class ComissionList extends Component {

    constructor(props){
        super(props);

        this.deleteComission = this.deleteComission.bind(this);
        this.state = {comissions: [] };
    }

    componentDidMount() {
        axios.get('/api/comission/')
            .then(response => {
                this.setState({comissions: response.data}) //return all the fields of exercises
            })
            .catch((error) => {
                console.log("Error: " + error)
            })
    }

    deleteComission(id){
        axios.delete('/api/comission/'+id)
            .then(res => console.log(res.data)); //this says exercise deleted from routes

        this.setState({
            comissions: this.state.comissions.filter(el => el._id !== id)
        })
    }

    comissionList() {
        return this.state.comissions.map(currentcomission => {
            console.log(currentcomission);

            return <Comission comission={currentcomission} deleteComission={this.deleteComission} key={currentcomission._id}/>;
        })
    }
 
    render() {

        return(
            <div>
                <h3>Comissions</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Creator</th>
                            <th>Comission (%)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.comissionList() } 
                    </tbody>
                </table>
            </div>
        )
    }

}