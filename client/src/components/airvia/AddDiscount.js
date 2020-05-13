import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';


class AddDiscount extends Component {

    constructor(props) { 
        super(props);  

        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeDiscountName = this.onChangeDiscountName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            creator: this.props.auth.user.name, 
            discountName: "",
            discount: "", 
            type: "Fixed",
            condition: null

        }
    }
   
    onChangeDiscountName(e) { 
        this.setState( { discountName: e.target.value });
    }

    onChangeDiscount(e) { 
        this.setState( { discount: e.target.value });
    }
    onChangeType(e) { 
        this.setState( { type: e.target.value });
    }
    onChangeCondition(e) { 
        this.setState( { condition: e.target.value });
    }

    onSubmit(e) {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const newDiscount = {
            creator: this.state.creator,
            discountName: this.state.discountName,
            discount: this.state.discount,
            type: this.state.type,
            condition: this.state.condition,
            
        };
            console.log(newDiscount);
        //Add item via Additem action
        axios.post('/api/discounts/add', newDiscount) 
            .then(res => console.log(res.data));

        window.location = '/manager';

    };

    render() {

        const { user } = this.props.auth;

        return(
            //form code 
            <div>
                <h3>Add Discount</h3>
                <form onSubmit={this.onSubmit}> 
                <div className="form-group"> 
                        <label>Discount Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.discountName}
                            onChange={this.onChangeDiscountName}
                            />       
                    </div>
                    <div className="form-group"> 
                        <label>Discount: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.discount}
                            onChange={this.onChangeDiscount}
                            />       
                    </div>
                    <div className="form-group"> 
                        <label>Type: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}>
                                <option>Fixed</option>
                                <option>Flexible</option>
                                </select>       
                    </div>

                    {(this.state.type === "Flexible") > 0 && (
              <div className="form-group"> 
              <label>Condition: </label>
              <input type="text"
                  required
                  className="form-control"
                  value={this.state.condition}
                  onChange={this.onChangeCondition}
                  />       
          </div>
            )}
                    
                    <div className="form-group">
                        <input type="submit" value="Add Discount" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

        );
    }
}

AddDiscount.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(AddDiscount);