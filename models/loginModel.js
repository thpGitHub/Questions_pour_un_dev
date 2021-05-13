const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

// Le premier argument est le nom singulier de la collection
module.exports = mongoose.model("Login", loginSchema);