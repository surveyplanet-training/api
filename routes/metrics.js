const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
	app: 'menu-api',
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

module.exports = function (router) {
	router.get('/metrics', (request, response, next) => {
		response.setHeader('Content-Type', register.contentType);
		response.end(register.metrics());
	});

	return router;
};
