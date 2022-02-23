
const packageJson = require('../package');
let localConfig = {};

try {
	localConfig = require('../config');
} catch (e) {
	// use environment variables instead of config file
}

let config = Object.assign( {

	name: 'Menu App',

	version: packageJson.version,

	port: process.env.PORT || 8080,
	
	timeout: 120000, 

	maxSize: 1048576, // 1MB in Bytes (1 * 1024 * 1024)
	
	queryLimit: 30,
	
	mongo: process.env.MONGO || 'mongodb://localhost:27017/menu',
	
	// https://mongoosejs.com/docs/connections.html#options
	mongoOptions : {
		useNewUrlParser: true,
		autoIndex: false,
		keepAlive: true,
		keepAliveInitialDelay: 300000,
		connectTimeoutMS: 10000,
		socketTimeoutMS: 45000,
		family: 4
	},

}, localConfig );

module.exports = Object.freeze(config);
