const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let IdentifierSchema = new Schema({
	identifier: String,
    userId: String,
    origin: String,
});

module.exports = mongoose.model('Identifier', IdentifierSchema);