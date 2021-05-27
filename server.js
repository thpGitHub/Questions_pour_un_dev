const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
require('./database_connect');
// require('./question_test');

// tableau d'objet pseudo: 'toto', privilege: 'standart'
const savePeudoOnServer = [];
// let saveQuestionsOnServer;

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

/*
* Routes
*/
const loginRouter = require('./routes/loginRouter');
app.use('/loginAll', loginRouter);
app.use('/loginSave', loginRouter);

const questionsRouter = require('./routes/questionsRouter');
// app.use('/questionsAll', questionsRouter);
// app.use('/questionsAll', questionsRouter);
// console.log("variableInQuestionController sur le serveuuuurrrrr", variableInQuestionControllers);
// console.log("variableInQuestionController === ", variableInQuestionController);

// app.use('/questionsAll', (req, res) => {

// })


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
//**********
// const Question = require('../models/questionsModel');
const Question = require('./models/questionsModel');
let saveAllQuestionsOnServer;    
    Question.find()
        .then(questions => {
            // SaveAllQuestionsOnServer = questions;
            saveAllQuestionsOnServer = questions;
            // console.log(saveAllQuestionsOnServer[0][question]);
            // console.log("SaveAllQuestionsOnServer === ",saveAllQuestionsOnServer[1].question);
            //res.json(questions);
        })
        .catch(err => console.log(err))

// let SaveAllQuestionsOnServer;
// console.log(SaveAllQuestionsOnServer);


//***********

const params_game = { counter_of_questions: 0,
                      tab_gamer_connect: [],
                      score_player_one: 0,
                      score_player_two: 0,
                      socket_session: "",
                      all_questions: [1,2],
                      counter: 15,
                      timer: 0
                    };



io.on("connection", (socket) => {
    console.log("New client connected");
    console.log("SaveAllQuestionsOnServer dans WS ===", saveAllQuestionsOnServer);
    
    socket.on('history of navigation', (msg) => {
        console.log("history recu sur le serveur ===", msg);
        params_game.socket_session = msg.location.state.pseudo;
        // consosle.log("params_game.socket_session === ", params_game.socket_session);
        socket.session = params_game.socket_session;
        // console.log("socket.session", socket);

        if(msg.location.state.player === "one") {
            socket.emit('only one player', socket.session)
        }
    });

    socket.on("start game", () => {
        setTimeout(launch_timer, 10000); 
        // setTimeout(io.emit("current question", saveAllQuestionsOnServer[params_game.counter_of_questions].question ), 10000); 
    });
    // let questions = questionsController.variableInQuestionControllers;
    // console.log("variableInQuestionControllers IN SERVER", questions);
    // socket.on('chat message', (msg) => {
    //     console.log('message recu sur server: ' + msg);
    // });
    // socket.emit('pseudo du gamer', "toto Gamerrr");
    // console.log("socket", socket);

    // const response = new Date();
    // socket.emit("FromAPI", response);

    /*
    * launch_timer and current question a remplacer par le nom start game !
     */
    function launch_timer() { // laun
        //if (params_game.counter_of_questions < params_game.all_questions.length) {
            io.emit("current question", saveAllQuestionsOnServer[params_game.counter_of_questions].question );
            io.emit("response a", saveAllQuestionsOnServer[params_game.counter_of_questions].a);
            io.emit("response b", saveAllQuestionsOnServer[params_game.counter_of_questions].b);
            io.emit("response c", saveAllQuestionsOnServer[params_game.counter_of_questions].c);
            io.emit("response d", saveAllQuestionsOnServer[params_game.counter_of_questions].d);
            params_game.timer = setInterval(the_timer, 1000);
        //}
    }
    function the_timer() {
        console.log('je suis le timer3 :)');
        io.emit('counter number', params_game.counter);
        params_game.counter--;
        if (params_game.counter === -1) {
            clearInterval(params_game.timer);
            //params_game.timer_run = 'off';
            params_game.counter = 15;
            //params_game.counter_of_questions++;
            //io.emit ( 'question are ready' ); 08/09/20
            // if (params_game.counter_of_questions < params_game.all_questions.length) {
            //     socket.emit ( 'question are ready' );
            // }
        }
    }
    // launch_timer();
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