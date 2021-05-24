const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Attention le schéma est celui de Login penser a faire celui de questions !!!!!
const loginSchema = new Schema({
    createdAt: {
         type: Date,
         default: Date.now 
    },
    level: {
        type: Number,
        default: 3
    },
    privileges: {
        type: String,
        default: "standart"
    },
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});
/*
* Le premier argument est le nom singulier de la collection.
* Le nom de la collection dans la BDD est logins
* Login est une classe que l'on instanciera dans le controller pour l'enregistrement en BDD
* new Login({...})
*/
module.exports = mongoose.model("Questions", loginSchema);