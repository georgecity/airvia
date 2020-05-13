const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const discountSchema = new Schema({
    creator: {type: String, ref: 'users', required: true, trim: true}, //take into accoutn
    discountName: {type: String, required: true, trim: true, unique: true},
    discount: {type: Number, required: true, trim: true },
    type: {type: String, required: true, trim: true, enum: ["Fixed", "Flexible"]},
    condition: {type: Number, trim: true, default: "0"}
},
{
    timestamps: true
});

const Discount = mongoose.model('discounts', discountSchema);

module.exports = Discount;