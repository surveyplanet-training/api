const promClient = require('prom-client');

// Create a Registry which registers the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
	app: 'menu-api',
});

promClient.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new promClient.Histogram({
	name: 'http_request_duration_microseconds',
	help: 'Duration of HTTP requests in microseconds',
	labelNames: ['handler', 'method', 'statuscode'],
	buckets: [0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10],
});

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds);

module.exports.measureRequestDuration = (req, res, next) => {
	const start = Date.now();
	res.once('finish', () => {
		const duration = Date.now() - start;
		httpRequestDurationMicroseconds.labels(req.url, req.method, res.statusCode).observe(duration);
	});
	next();
};

module.exports.registerPromMetrics = async (req, res) => {
	let metrics;

	try {
		metrics = await register.metrics();
	} catch (ex) {
		res.status(500).end(ex);
	}

	res.setHeader('Content-Type', register.contentType);
	res.end(metrics);
};

console.log('Monitoring initialized');
