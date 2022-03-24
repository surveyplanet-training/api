const mongoose = require('mongoose');
const client = require('prom-client');
const express = require('express');
const packageJson = require('../package.json');
const router = express.Router();
// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
	app: 'menu-api',
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

module.exports = function () {

	router.get('/metrics', async (request, response, next) => {
		response.setHeader('Content-Type', register.contentType);
		const metrics = await register.metrics();
		response.send(metrics);
	});


	router.get('/liveness', function(req, res, next) {

		res.set('X-Robots-Tag', 'noindex');
	
		res.json({
			name: 'Menu API',
			version: packageJson.version,
			env: process.env.NODE_ENV,
			live: 1,
			ua: req.get('User-Agent'),
			ip: req.ip
		})

	});
	
	router.get('/readiness', async function(req, res, next) {
	
		res.set('X-Robots-Tag', 'noindex');

		// 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
		const connected = mongoose.STATES[mongoose.connection.readyState] === 'connected';

		if (!connected) {
			return next(503);
		}
		
		res.json({
			name: 'Menu API',
			version: packageJson.version,
			env: process.env.NODE_ENV,
			ready: connected ? 1 : 0,
			ua: req.get('User-Agent'),
			ip: req.ip
		});
	
	});

	return router;
};
