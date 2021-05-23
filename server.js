const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
require('./database_connect');
// tableau d'objet pseudo: 'toto', privilege: 'standart'
const savePeudoOnServer = [];

const io = require("socket.io")(http, { 
    cors: { 
      origin: "http://localhost:3000" , 
      methods: [ "GET" , "POST" ] 
    } });

app.use(cors());
/*
* For use req.body because 'body-parser' is depreciated since Express 4.16.0
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRouter = require('./routes/loginRouter');
app.use('/loginAll', loginRouter);
app.use('/loginSave', loginRouter);

app.use('/saveOnePlayerOnServer', (req, res) => {
    // console.log('req body pseudo in savePseudoOnServer ===', req.body.pseudo);
    // console.log('req body privilege in savePseudoOnServer ===', req.body.privilele);
    // console.log(req.body);
    // // console.log('req body in privilege savePseudoOnServer ===', req.body.privilege);
    // savePeudoOnServer[0] = (req.body);
    // console.log(savePeudoOnServer);
    // console.log(savePeudoOnServer[1]);
    res.send('/savePseudoOnServer OK !')
})

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on('chat message', (msg) => {
        console.log('message recu sur server: ' + msg);
    });
    socket.emit('pseudo du gamer', "toto Gamerrr");
    // console.log("socket", socket);

    // const response = new Date();
    // socket.emit("FromAPI", response);
  });

/*
* Say to Heroku where are the build folder (/client/build)
*/ 
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const PORT = process.env.PORT || 8001;
http.listen(PORT, () => {
    const date = new Date();
    console.log(`${ date.getHours() }H${ date.getMinutes() } on port : ${ PORT }`);
});