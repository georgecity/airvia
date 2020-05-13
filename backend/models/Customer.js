const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {type: String, required: true, trim: true},
    address: {type: String, required: true, trim: true},
    email: {type: String, unique: true, required: true},
    contactNumber: {type: Number, required: true, trim: true},
    discount: {type: String, ref: 'discounts', trim: true},
    customerStatus: {type: String, required: true, enum: ["Regular", "Valued"], default: "Regular", trim: true}
},
{
    timestamps: true
});

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;