const Question = require('../models/questionsModel');

exports.questionsAll = function(req, res) {
    Question.find()
    .then(users => res.json(users))
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