const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Attention le schéma est celui de Login penser a faire celui de questions !!!!!
const loginSchema = new Schema({
    question: {
         type: String,
         required: true 
    },
    a: {
        type: String,
        required: true
    },
    b: {
        type: String,
        required: true
    },
    c: {
        type: String,
        required: true
    },
    d: {
        type: String,
        required: true
    },
    response: {
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