const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route for client signup
router.post('/signup', clientController.signupClient);

// Route for client login
router.post('/login', clientController.loginClient);

module.exports = router;
