const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega esta línea
const app = express();
const path = require('path');
const ejs = require('ejs');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Configuración para EJS
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Middleware para CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://www.localhost:8100');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(cors({ origin: 'http://www.localhost:8100' }));


// routes
app.use('/api', require('./routes/app'));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next(err);
  }
});

// public
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log('Escuchando en el puerto: ', app.get('port'));
});

