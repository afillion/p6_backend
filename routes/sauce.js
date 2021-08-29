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

// router.get('/api/sauces', (req, res, next) => {
//   res.status(201);
//   next();
// }); //response status for '/api/sauces' via GET

// router.get('/api/sauces', (req, res, next) => {
//   res.json("test GET");
// }) //response content for '/api/sauces' via GET

// router.post('/api/sauces', (req, res, next) => {
//   console.log("/api/sauces:POST : ", req.body);
//   const sauce = new Sauce({
//     ...req.body
//   });
//   sauce.save()
//     .then( () => {res.status(201).json({ message: 'Sauce enregistrée !'});} )
//     .catch( error => res.status(400).json({ error }) );
// });

module.exports = router;