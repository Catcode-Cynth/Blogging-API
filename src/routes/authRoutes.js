const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const auth = require('../middleware/auth');


// POST /api/v1/auth/signup
router.post('/signup', signup);

// POST /api/v1/auth/signin
router.post('/signin', signin);

module.exports = router;

