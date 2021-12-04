const path = require('path');

module.exports = function (router) {

	router.get( '/', (request, response, next) => {
		const index = path.resolve( __dirname, '../static/index.html');
		response.sendFile(index);
	});

	return router;

};