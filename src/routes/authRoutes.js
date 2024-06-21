const express = require('express');
const { register, login } = require('../controllers/authController');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate, register);
router.post('/login', login);

module.exports = router;
