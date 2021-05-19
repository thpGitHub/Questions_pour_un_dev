// const express = require('express');
// const router = express.Router()

const Login = require('../models/loginModel');

exports.loginAll = function(req, res) {
    Login.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
}

exports.loginSave = function(req, res) {
    console.log('jsuis dans le router post');
    console.log('jsuis dans le router post et req body = ', req.body);
    const { pseudo, password } = req.body;
    const newLogin = new Login({ pseudo: pseudo, password: password })
    newLogin.save()
         .then(() => res.json())
         .catch(err => console.log(err))
   }

// router.get('/', (req, res) => {
//     Login.find()
//         .then(users => res.json(users))
//         .catch(err => console.log(err))
// })

// router.post('/', (req, res) => {
//     console.log('jsuis dans le router post');
//     console.log('jsuis dans le router post et req body = ', req.body);
//     const { username, email } = req.body; // Attention le state username ne correspond pas au name de la bdd
//     const newUser = new User({
//         name: username, email: email
//     })
//     newUser.save()
//         .then(() => res.json({
//             message: "Created account successfully"
//         }))
//         .catch(err => res.status(400).json({
//             "error": err,
//             "message": "Error creating account"
//         }))
// })


// module.exports = router 