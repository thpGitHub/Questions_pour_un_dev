const express = require('express');
const router = express.Router();
/*
* Require controller modules.
*/
const loginController = require('../controllers/loginController');
/*
* LOGIN ROUTES 
*/
router.get('/', loginController.loginAll);
router.post('/', loginController.loginSave);

module.exports = router;