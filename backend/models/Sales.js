const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
    seller: {type: String, ref: 'users', required: true, trim: true},
    customer: {type: String, ref: 'customers', required: true, trim: true},
    ticketAmount: {type: Number, trim: true, required: true },
    blankID: {type: Number, ref: 'blanks', required: true, trim: true},
    coupons: [{type: String, required: true, trim: true, default: ""}], //auditor coupons
    date: {type: Date, required: true, trim: true, default: Date.now},
    method: { type: String, required: true, trim: true, enum: ["Cash", "Card", "Pay Later"]},
    currency: {type: String, required: true, trim: true, enum: ["GBP", "USD"]},
    currencyRate: {type: Number, ref: 'currencies', trim: true},
    comission: {type: Number, ref: 'comissions', required: true },
    discount: {type: String, ref: 'discounts', trim: true},
    payment: {type: String, ref: 'payments', required: true, trim: true},
},
{
    timestamps: true
});

const Sales = mongoose.model('sales', salesSchema);

module.exports = Sales;