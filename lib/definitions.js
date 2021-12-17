const config = require('../env');

module.exports = Object.freeze({
	mongoUri: `mongodb+srv://${config.mongo.user}:${config.mongo.password}@stage.w4tez.mongodb.net/menu?retryWrites=true&w=majority`,
});
