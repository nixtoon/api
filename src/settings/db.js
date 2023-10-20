// Using Node.js `require()`
const mongoose = require('mongoose');
const key = require('./keys');

mongoose.connect(key.database[0])
.then(data => console.log('DB is connected'))
.then(err => console.error(err));