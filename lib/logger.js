
const ignore = [
	'/favicon.ico',
	'/metrics',
	'/readiness',
	'/liveness'	
];


module.exports.skip = (req, res) => {
	return ignore.includes(req.url) && req.method === 'GET';
};

module.exports.format = (tokens, req, res) => {

	const info = {
		method: tokens.method(req, res),
		url: tokens.url(req, res),
		ip: tokens['remote-addr'](req, res),	
		status: tokens.status(req, res),
		ua: tokens.req(req, res, 'user-agent'),	
		length: tokens.res(req, res, 'content-length'),
		responseTime: tokens['response-time'](req, res),
		timestamp: new Date().toISOString(),
	};

	return JSON.stringify(info);

};