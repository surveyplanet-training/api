const httpShutdown = require('http-shutdown');
const app = require('./app');
const client = app.get('client');

let server;

function serverErrorHandler(error) {
	if (error.code === 'EACCESS') {
		console.error('Permission denied');
		process.exit(1);
	} else if (error.code === 'EADDRINUSE') {
		console.error('Port is already in use');
		process.exit(1);
	} else {
		console.error(error);
		process.exit(1);
	}
}

function serverListeningHandler() {
	console.log(`Server listening on port ${app.get('port')}`);
}

function sigintHander() {
	console.error('SIGINT ( Control-C ) shutting down...');
	shutdown();
}

function sigtermHander() {
	console.error('SIGTERM ( Process Killed ) shutting down...');
	shutdown();
}

function shutdown() {
	if (!server) {
		return process.exit(1);
	}

	server.shutdown(function (err) {
		if (err) {
			console.error('shutdown failed:', err.message);
			process.exit(1);
		}

		// close db connection
		if (client) {
			client.close();
		}

		process.exit(0);
	});
}

(async function () {
	await client.connect();

	server = httpShutdown(app.listen(app.get('port')));

	server.on('error', serverErrorHandler);
	server.on('listening', serverListeningHandler);

	process.on('SIGINT', sigintHander);
	process.on('SIGTERM', sigtermHander);
})();
