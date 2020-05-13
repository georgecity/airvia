import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
 } from "reactstrap";
import axios from 'axios';


class AddCurrencyRate extends Component{

    constructor(props) { 
        super(props);
        this.onChangeCurrencyRate = this.onChangeCurrencyRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
        modal: false,
        creator: this.props.auth.user.name,
        currencyRate: "",
        date: new Date()
    };}

    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        });
    };

    onChangeCurrencyRate(e){
        this.setState({ currencyRate: e.target.value });

    };

    onSubmit = (e) => {
        //since is a form we have to prevent the form from submitting
        e.preventDefault();

        const newCurrency = {

            creator: this.state.creator,
            currencyRate: this.state.currencyRate,
            date: this.state.date

        };

        //Add item via Additem action
        axios.post('/api/currency/add', newCurrency) 
            .then(res => console.log(res.data));

        //Close modal
        this.toggle();
        window.location = '/dashboard';
    };

    render() {
        return(
            <div>
                <Button
                color="dark"
                style={{marginBottom: "2rem"}}
                onClick={this.toggle}
                >Add Currency Rate</Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Enter Today's Currency Rate</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="currency">Currency Rate</Label>
                                <Input
                                type="text"
                                //"name" shoul match the attribute in the state above
                                name="name"
                                id="currencyRate"
                                placeholder="Add Currency Rate"
                                value={this.state.currencyRate}
                                onChange={this.onChangeCurrencyRate}
                                />
                                <Button
                                color="dark"
                                style={{marginTop:"2rem"}}
                                block
                                >Add Currency Rate</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        );
    }

}
AddCurrencyRate.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(AddCurrencyRate);