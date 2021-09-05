// PLUGINS
const express = require('express');
const mongoose = require('mongoose');


// MODELS
const User = require('./models/user');
const Sauce = require('./models/sauce');

// ROUTES
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();
// Replace bodyParser : It's include in express now
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, '/images')));
// Cela indique à Express qu'il faut gérer la ressource images 
// de manière statique (un sous-répertoire de notre répertoire de base, __dirname )
// à chaque fois qu'elle reçoit une requête vers la route /images

mongoose.connect('mongodb+srv://admin-alexiscluster:p47b81253g89wnt@alexiscluster.tpyem.mongodb.net/AlexisCluster?retryWrites=true&w=majority',
  { useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => {console.log('Connexion à MongoDB réussie !')}
  )
.catch(() => {console.log('Connexion à MongoDB échouée !')}
  );

app.use((req, res, next) => {
  next();
}); //server msg BEGIN

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); //response define header for all routes and methods(GET POST PUT DELETE..)

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

app.use((req, res, next) => {
  res.status(200);
  next();
});//response status for undefined routes && methods

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
}); //response content for undefined routes && methods

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
}); // server msg END

module.exports = app;