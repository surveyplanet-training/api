const { 
	collectDefaultMetrics,
	register
} = require('prom-client');

collectDefaultMetrics();

// // Create a Registry which registers the metrics
// const register = new promClient.Registry();
// promClient.collectDefaultMetrics({ register });

// const Histogram = promClient.Histogram;

// const requestDuration = new Histogram({
// 	name: 'http_request_duration_seconds',
// 	help: 'request duration histogram',
// 	labelNames: ['handler', 'method', 'statuscode'],
// 	buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
// });

// // Register the histogram
// register.registerMetric(requestDuration);

// module.exports.measureRequestDuration = (req, res, next) => {

// 	const start = Date.now();

// 	res.once('finish', () => {

// 		requestDuration
// 			.labels(req.url, req.method, res.statusCode)
// 			.observe( Date.now() - start );

// 	});

// 	next();

// };


module.exports.registerPromMetrics = async (req, res) => {

	let metrics;

	try {
		metrics = await register.metrics();
	} catch (ex) {
		res.status(500).end(ex);
	}

	res.set('Content-Type', register.contentType);
	res.end( metrics );

};

console.log('Monitoring initialized');