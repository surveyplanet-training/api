if (process.env.NODE_ENV !== 'github_action') {
	const config = require('../env');
} else {
	let config;
	config.mongo.user = process.env.MONGODB_USERNAME;
	config.mongo.password = process.env.MONGODB_PASSWORD;
}

module.exports = Object.freeze({
	mongoUri: `mongodb+srv://${config.mongo.user}:${config.mongo.password}@stage.w4tez.mongodb.net/menu?retryWrites=true&w=majority`,
});
