const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const EXCLUDE = [];

module.exports = function () {
	let files = fs.readdirSync(`${__dirname}/v1`) || [];
	for (let file of files) {
		if (!EXCLUDE.includes(file) && path.extname(file) === '.js') {
			const routes = path.resolve('./routes/v1', file);
			require(routes)(router);
		}
	}

	// List all routes
	// router.stack.forEach( function (r) {
	// 	if (r.route && r.route.path){
	// 		console.log(`/v1${r.route.path}`);
	// 	}
	// });

	return router;
};
