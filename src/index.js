const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Configuración para EJS
app.set('view engine', 'ejs');



// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Middleware para CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Especifica los métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Especifica los encabezados permitidos
  next();
});

// routes
app.use('/api', require('./routes/app'));

// public
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log('Escuchando en el puerto: ', app.get('port'));
});
