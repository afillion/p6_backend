const http = require('http');
const app = require('./app');

//renvoi un port valide qu'il soit un numero ou une chaine de caractere
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Execute la fonction normalizePort
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
    console.error(bind + ' requires elevated privileges.');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(bind + ' is already in use.');
    process.exit(1);
    break;
    default:
    throw error;
  }
};

//lancement du serveur
const server = http.createServer(app);

//écoute des évênements
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
server.listen(port);

// const server = http.createServer((req, res) => {
//     res.end('Voilà la réponse du serveur !');
// }); Remplacer par const server = http.createServer(app);

// server.listen(process.env.PORT || 3000);