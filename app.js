const express = require('express');
const config = require('./env');
const {MongoClient} = require('mongodb');

const app = express();
const uri = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@stage.w4tez.mongodb.net/surveyplanet?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.set('client', client); // use: app.get('client')

let homeRoutes = require('./routes/index');
let userRoutes = require('./routes/users');

app.use( '/', homeRoutes() );
app.use( '/user', userRoutes() );

module.exports = app;