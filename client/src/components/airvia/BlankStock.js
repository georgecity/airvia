import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Blank = props => ( //functional react component, no state or lifecycle methods
    <tr>
        <td><Button variant="contained" color="default" onClick={() =>{window.location = "/api/stock/manage/"+props.blank._id}}>Manage</Button></td>
        <td>{props.blank.owner}</td>
        <td>{props.blank.blankType}</td>
        <td>{props.blank.blankID}</td>
        <td>{props.blank.status}</td>
        <td>
         <a href="#" onClick={() => {props.deleteBlank(props.blank._id)}}>delete</a>
        </td>
    </tr>
)

export default class BlankStock extends Component {

    constructor(props){
        super(props);

        this.deleteBlank = this.deleteBlank.bind(this);
        this.state = {blanks: [] };
    }

    componentDidMount() {
        axios.get('/api/stock/')
            .then(response => {
                this.setState({blanks: response.data}) //return all the fields of exercises
            })
            .catch((error) => {
                console.log("Error: " + error)
            })
    }

    deleteBlank(id){
        axios.delete('/api/stock/'+id)
            .then(res => console.log(res.data)); //this says exercise deleted from routes

        this.setState({
            blanks: this.state.blanks.filter(el => el._id !== id)
        })
    }

    blankList() {
        return this.state.blanks.map(currentblank => {
            console.log(currentblank);

            return <Blank blank={currentblank} deleteBlank={this.deleteBlank} key={currentblank._id}/>;
        })
    }
 
    render() {

        return(
            <div>
                <h3>Blank Stock</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th></th>
                            <th>Owner</th>
                            <th>BlankType</th>
                            <th>Blank ID</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.blankList() } 
                    </tbody>
                </table>
            </div>
        )
    }

}