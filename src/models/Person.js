const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Person = new Schema({
    person_id: String,
    first_name: String,
    last_name: String,
    active: Boolean,
    email: String,
    phone: String,
    dni: String
});

module.exports = mongoose.model('person', Person)