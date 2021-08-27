const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.post('/api/auth/signup', (req, res, next) => {

// });

// router.post('/api/auth/login', (req, res, next) => {

// });

// module.exports = router;