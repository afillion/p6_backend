const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('', auth, sauceCtrl.getAll);
router.get('/:id', auth, sauceCtrl.getOne);
router.post('', auth, multer, sauceCtrl.new);
router.put('/:id', auth, multer, sauceCtrl.modifOne);
router.delete('/:id', auth, sauceCtrl.delOne);
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;