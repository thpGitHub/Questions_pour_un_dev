const express = require('express');
const router = express.Router();

// Require controller modules.
const questionsController = require('../controllers/questionsController');

/// LOGIN ROUTES ///

router.get('/', questionsController.questionAll);

// router.post('/', loginController.loginSave);

module.exports = router;