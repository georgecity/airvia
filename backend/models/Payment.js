const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    customer: {type: String, ref: 'customers', required: true, trim: true}, //take into accoutn
    cardNumber: {type: String, required: true, trim: true, maxlength: 19},
    cvv: {type: Number, required: true, trim: true, maxlength: 3},
    expiryDate: {type: Date, required: true, trim: true},
    billingAddress: { type: String, required: true, trim: true},
    nameOnCard: { type: String, required: true, trim: true}
},
{
    timestamps: true
});

const Payment = mongoose.model('payments', paymentSchema);

module.exports = Payment;