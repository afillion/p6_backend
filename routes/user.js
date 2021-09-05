const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;
// Define routes for each path. See methods in controllers/