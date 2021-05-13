const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
// const cors = require('cors');
require('./database_connect');
require('dotenv').config();//*********** */

app.use((req, res, next) => {
    //Permet d'accéder à notre API depuis n'importe quelle origine ('*')
   res.setHeader('Access-Control-Allow-Origin', '*');
    //Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // Permet de passer au middleware suivant 
   next();
});


// app.use(cors());
// API ou controllers
const login = require('./controllers/loginController');
app.use('/controllers/loginController', login);

// Say to Heroku where are the build folder (/client/build)
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const PORT = process.env.PORT || 8001;
http.listen(PORT, () => {
    const date = new Date();
    console.log(`${ date.getHours() }H${ date.getMinutes() } on port : ${ PORT }`);
});