const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SessionSchema = new Schema({
	identifier: String,
    userId: String,
    origin: String,
});

module.exports = mongoose.model('Session', SessionSchema);