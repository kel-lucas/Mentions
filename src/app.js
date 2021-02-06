const express = require ('express');

// App
const app = express();

// Load Routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

module.exports = app;
