const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
require('./database_connect');

app.use(cors());
/*
* For use req.body
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRouter = require('./routes/loginRouter');
app.use('/loginAll', loginRouter);

// const saveLoginRouter = require('/routes/saveLoginRouter');
app.use('/loginSave', loginRouter);

// API ou controllers
// const login = require('./controllers/loginController');
// app.use('/controllers/loginController', login);

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