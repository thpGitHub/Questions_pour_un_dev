const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
// require('./database_connect');
const DatabaseConnection = require('./database_connection');
// const AuthenticateService = require('./')

DatabaseConnection.connect();
// const savePeudoOnServer = [];

const io = require("socket.io")(http, { 
    cors: { 
      origin: "http://localhost:3000", 
      methods: [ "GET" , "POST" ] 
    } });

app.use(cors());
/*
* For use req.body because 'body-parser' is depreciated since Express 4.16.0
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
* Routes
*/
const loginRouter = require('./routes/loginRouter');
app.use('/loginAll', loginRouter);
app.use('/loginSave', loginRouter);

const questionsRouter = require('./routes/questionsRouter');

const Question = require('./models/questionsModel');
let saveAllQuestionsOnServer;    
    Question.find()
        .then(questions => {
            saveAllQuestionsOnServer = questions;
        })
        .catch(err => console.log(err))

const params_game = { counter_of_questions: 0,
                      tab_gamer_connect: [],
                      score_player_one: 0,
                      score_player_two: 0,
                      socket_session: "",
                      all_questions: [1,2],
                      counter: 15,
                      timer: 0
                    };
/*
* Connection Websocket
*/
io.on("connection", (socket) => {   
    socket.on('history of navigation', (msg) => { 
        params_game.socket_session = msg.location.state.pseudo;
        socket.session = params_game.socket_session;
       
        if(msg.location.state.player === "one") {
            socket.emit('only one player', socket.session)
        }
    });

    socket.on("start game", () => {
        
        if(params_game.counter_of_questions <saveAllQuestionsOnServer.length) {
            setTimeout(launch_timer, 10000); 
        } else {
            io.emit("Game Over");
        }
    });

    socket.on("player response", (msg) => {
        clearInterval(params_game.timer);
        params_game.counter = 15;
        if(msg === saveAllQuestionsOnServer[params_game.counter_of_questions].response) {
            params_game.score_player_one++;
            io.emit("bonne reponse", params_game.score_player_one);
            params_game.counter_of_questions++;
        }
    });
    /*
    * launch_timer and current question.
    */
    function launch_timer() { 
            io.emit("current question", saveAllQuestionsOnServer[params_game.counter_of_questions].question );
            io.emit("response a", saveAllQuestionsOnServer[params_game.counter_of_questions].a);
            io.emit("response b", saveAllQuestionsOnServer[params_game.counter_of_questions].b);
            io.emit("response c", saveAllQuestionsOnServer[params_game.counter_of_questions].c);
            io.emit("response d", saveAllQuestionsOnServer[params_game.counter_of_questions].d);
            params_game.timer = setInterval(the_timer, 1000);
    }
    function the_timer() {
        io.emit('counter number', params_game.counter);
        params_game.counter--;
        if (params_game.counter === -1) {
            clearInterval(params_game.timer);
            params_game.counter = 15;
        }
    }
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