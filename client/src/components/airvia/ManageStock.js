import React, { Component } from 'react';
import axios from 'axios';


 export default class ManageStock extends Component {

    constructor(props) { 
        super(props);  

        this.onChangeOwner = this.onChangeOwner.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is how u create variables in react
        this.state = { 
            owner: "",
            status: "",
            users: []
        }
    }
   
    componentDidMount() {  //react life cycle method automatically called right before anything displays the page
        axios.get("/api/stock/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    owner: response.data.owner,
                    status: response.data.status,
                    
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        
        axios.get('/api/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.name), //to avoid giving different fields of the user array, map allow us to return data foe every item in the array
                        user: response.data[0].name
                    })
                }
            })
    }

    onChangeOwner(e) { 
        this.setState( { owner: e.target.value });
    }

    onChangeStatus(e) { 
        this.setState( { status: e.target.value });
    }

    onSubmit(e) {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const blank = {

            owner: this.state.owner,
            status: this.state.status
        };

        //Add item via Additem action
        axios.post('/api/stock/update/'+ this.props.match.params.id, blank) 
            .then(res => console.log(res.data));

        window.location = '/api/stock/';

    };


    render() {
        return(
            //form code 
            <div>
                <h3>Stock Management</h3>
                <form onSubmit={this.onSubmit}> 
                <div className="form-group"> 
                    <label>Owner: </label>
                    <select ref="userInput" //dropdown menu /different methods inside brackets
                            required
                            className="form-control"
                            value={this.state.owner}
                            onChange={this.onChangeOwner}>
                                {
                                    this.state.users.map(function(name) { //jaavscript fucntion for users returned form mongo which gives us options
                                        return <option
                                        key={name}
                                        value={name}>{name}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group"> 
                        <label>Status: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChangeStatus}>
                                <option>Void</option>
                                <option>Lost/Stolen</option>
                                <option>Refunded</option>
                                </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}
