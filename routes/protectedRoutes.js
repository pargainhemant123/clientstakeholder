const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware'); // Import authentication middleware
const clientController = require('../controllers/clientController'); // Import the client controller


// Route to get the authenticated client's profile
router.get('/profile/:id', authenticateJWT, clientController.getProfile);

module.exports = router;
