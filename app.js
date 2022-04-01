const express = require('express');
const mongoose = require('mongoose');
const config = require('./lib/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const { measureRequestDuration } = require('./lib/monitor');
const {skip, format} = require('./lib/logger');


// const loggerMiddleware = connectLogger(logger);

// App routes
const routes = require('./routes/index');
const metrics = require('./routes/metrics');

mongoose.connect(config.mongo, config.mongoOptions)
	.then(() => console.log('Connected to MongoDB'))
	.catch(console.error);

const app = express();

app.set('port', config.port); // use: app.get('port')
app.use( bodyParser.json() );
app.use( morgan( format, {skip:skip} ) );
// app.use( measureRequestDuration );


// all urls will be accessed through /v1/... ( e.g. /v1/users, /v2/foods, etc.)
// This allows us to have a versioned API so we can make changes to routes
// if we need to while still keeping old routes aournd for legacy clients
app.use('/v1', routes());
app.use('/', metrics() );


module.exports = app;
