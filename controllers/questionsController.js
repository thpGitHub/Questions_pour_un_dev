const Question = require('../models/questionsModel');

 let variableInQuestionControllers;
// exports.variableInQuestionControllers = variableInQuestionControllers;

exports.questionsAll = function(req, res) {
    console.log("je suis dans questionControleur !!!!");
    Question.find()
    // .then(questions => res.json(questions))
    .then(questions => {
        console.log("je suis dans questionControleur !!!!");
        variableInQuestionControllers = questions;
        console.log(variableInQuestionControllers);
            res.json(questions);
            })
    .catch(err => console.log(err))
}

// exports.loginSave = function(req, res) {
//     console.log('jsuis dans le router post');
//     console.log('jsuis dans le router post et req body = ', req.body);
//     const { pseudo, password } = req.body;
//     const newLogin = new Login({ pseudo: pseudo, password: password });
//     newLogin.save()
//          .then(() => res.json())
//          .catch(err => console.log(err));
//     savePeudoOnServer = pseudo;
//     console.log(savePeudoOnServer);
//    }