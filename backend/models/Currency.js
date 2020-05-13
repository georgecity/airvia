const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const currencySchema = new Schema({
    creator: {type: String, ref: 'users', required: true, trim: true},
    currencyRate: {type: Number, required: true, trim: true},
    date: {type: Date, default: Date.now, expires: 21600, required: true, trim: true},
},
{
    timestamps: true
});

const Currency = mongoose.model('currencies', currencySchema);

module.exports = Currency;