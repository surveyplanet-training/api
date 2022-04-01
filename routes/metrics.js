const mongoose = require('mongoose');
const express = require('express');
const packageJson = require('../package.json');
const router = express.Router();
const {registerPromMetrics} = require('../lib/monitor');

module.exports = function () {

	router.get('/metrics', registerPromMetrics );

	router.get('/liveness', function(req, res, next) {

		res.set('X-Robots-Tag', 'noindex');
	
		res.json({
			name: 'Menu API',
			version: packageJson.version,
			env: process.env.NODE_ENV,
			live: 1,
			ua: req.get('User-Agent'),
			ip: req.ip
		});

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
