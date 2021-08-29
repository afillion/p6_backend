const Sauce = require('../models/sauce');

exports.getAll = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

exports.getOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    res.status(201).json(sauce);
  })
  .catch(error => res.status(404).json({ error }));
}

exports.new = (req, res, next) => {
  const item = JSON.parse(req.body.sauce);
  delete item._id;
  const sauce = new Sauce({
    ...item
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  sauce.likes = 0;
  sauce.dislikes = 0;
  sauce.userLiked = [];
  sauce.userDisliked = [];
  sauce.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
}

exports.modifOne = (req, res, next) => {
  Sauce.findById({ _id: req.params.id })
  .then( oldSauce => {
    console.log(req.params, req.body, req.file);
    const newSauce = (req.body.sauce !== undefined) ? JSON.parse(req.body.sauce) : req.body
    const newUrl = (req.file !== undefined) ? `http://localhost:3000/images/${req.file.filename}` : null;
    oldSauce.name = newSauce.name;
    oldSauce.manufacturer = newSauce.manufacturer;
    oldSauce.description = newSauce.description;
    oldSauce.mainPepper = newSauce.mainPepper;
    oldSauce.heat = newSauce.heat;
    oldSauce.imageUrl = (newUrl !== null) ? newUrl : oldSauce.imageUrl;
    console.log(oldSauce);
    oldSauce.save()
    .then( () => {
      res.status(200).json({ message : 'Sauce modifié' });
    })
    .catch( error => {
      res.status(400).json({ error });
    });
  })
  .catch( error => {
    res.status(404).json({ error });
  });
}

exports.delOne = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).json({ message: 'Objet supprimé !'})
  })
  .catch(error => {
    res.status(400).json({ error })
  });
}

exports.like = (req, res, next) => {

}