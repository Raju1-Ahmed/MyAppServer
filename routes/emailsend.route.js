const express = require('express');
const { createEmail, getEmail } = require('../controllers/email.controllers.js'); // Update the import statement here
const router = express.Router();

router.post('/email', createEmail);

router.get('/email', getEmail);


module.exports = router;
