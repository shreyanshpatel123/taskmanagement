const express = require('express');
const { login, registerAdmin, registerUser, displayUser } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register-admin', registerAdmin);
router.post('/register-user',registerUser)
router.get('/display-user',displayUser)
module.exports = router;
