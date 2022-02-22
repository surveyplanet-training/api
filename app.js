const express = require('express');
const config = require('./env');
const mongoose = require('mongoose');
const { mongoUri } = require('./lib/definitions');
const bodyParser = require('body-parser');

mongoose.connect(mongoUri);

const app = express();

app.set('port', config.port || 8080); // use: app.get('port')
app.use( bodyParser.json() );
let routes = require('./routes/index');

// all urls will be accessed through /v1/... ( e.g. /v1/users, /v2/foods, etc.)
// This allows us to have a versioned API so we can make changes to routes
// if we need to while still keeping old routes aournd for legacy clients
app.use('/v1', routes());

module.exports = app;
