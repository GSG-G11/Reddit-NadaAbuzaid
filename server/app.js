const express = require('express');
const middleware = require('./middlewares');
require('env2')('.env');

const app = express();

middleware(app);

app.set('port', process.env.PORT || 8000);

module.exports = app;
