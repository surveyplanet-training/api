const express = require('express');
const config = require('./env');
const { MongoClient } = require('mongodb');

const app = express();
const uri = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@stage.w4tez.mongodb.net/surveyplanet?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.set('client', client); // use: app.get('client')
app.set('port', config.port || 8080); // use: app.get('port')

let routes = require('./routes/index');

// all urls will be accessed through /v1/... ( e.g. /v1/users, /v2/foods, etc.)
// This allows us to have a versioned API so we can make changes to routes
// if we need to while still keeping old routes aournd for legacy clients
app.use('/v1', routes());

module.exports = app;
