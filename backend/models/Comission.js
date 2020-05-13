const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const comissionSchema = new Schema({
    creator: {type: String, ref: 'users', required: true, trim: true}, //take into account
    comission: {type: Number, required: true, trim: true, unique: true},
},
{
    timestamps: true
});

const Comission = mongoose.model('comissions', comissionSchema);

module.exports = Comission;