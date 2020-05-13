const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlankSchema = new Schema({
    owner: {type: String, ref: 'users'},
    blankType: {type: Number, required: true, trim: true},
    blankID: {type: Number, required: true, trim: true},
    status: {type: String, required:true, default: "Available"}
},
{
    timestamps: true
});

const Blank = mongoose.model('blanks', BlankSchema);

module.exports = Blank;