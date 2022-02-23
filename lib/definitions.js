let config;
if ((process.env.LOCAL_ENV = 'github')) {
	config.mongo.user = process.env.MONGODB_USERNAME;
	config.mongo.password = process.env.MONGODB_PASSWORD;
} else {
	config = require('../env');
}

module.exports = Object.freeze({
	mongoUri: `mongodb+srv://${config.mongo.user}:${config.mongo.password}@stage.w4tez.mongodb.net/menu?retryWrites=true&w=majority`,
});
