const { ObjectId } = require('mongodb');

const User = require('../../lib/models/user');

module.exports = function (router) {
	
	router.get('/user/', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let user;

		try {
			user = await User.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(user || {});

	});

	// router.get('/users', async (request, response, next) => {

	// 	let users,
	// 		query = {};

	// 	if (ObjectId.isValid(request.query.after)) {
	// 		query = {
	// 			_id: {
	// 				$gt: ObjectId(request.query.after),
	// 			},
	// 		};
	// 	}

	// 	try {
	// 		users = await User.find(query).limit(10);
	// 	} catch (err) {
	// 		return Promise.reject(err);
	// 	}

	// 	response.json(users || []);
	// });


	// =============================================================================
	// U P D A T E
	// =============================================================================

	router.put('/user', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let user;

		try {
			user = await User.updateOne(query, request.body, { new: true });
		} catch (err) {
			next(err);
		}
		response.json(user || {});
	});

	router.put('/users', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let users;

		try {
			users = await User.findOneAndUpdate(query, request.body, { new: true });
		} catch (err) {
			next(err);
		}

		response.json(users || {});
	});

	router.post('/user', async function (request, response) {

		const user = new User(request.body);
		let doc;
		try {
			doc = await user.save();
		
		} catch (e) {
			console.log(e);
			return response.status(500).send(e);
		}
		response.json(doc);

	});

	router.post('/users', async function (request, response) {

		const users = new User(request.body);
		let doc;
		try {
			doc = await users.save();
		
		} catch (e) {
			console.log(e);
			return response.status(500).send(e);
		}
		response.json(doc);

	});

	router.delete('/user', async (request, response, next) => {
		if (!ObjectId.isValid(request.params._id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let user;

		try {
			user = await User.deleteOne(query);
		} catch (err) {
			next(err);
		}

		response.json(user || {});
	});

	return router;

};
