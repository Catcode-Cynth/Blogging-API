const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserProfile } = require('../controllers/userController');

// GET /api/v1/users/me
router.get('/me', auth, getUserProfile);

module.exports = router;
