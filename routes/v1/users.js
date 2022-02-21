const { ObjectId } = require('mongodb');

const User = require('../../lib/models/user');

module.exports = function (router) {
	
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

	//grab stuff from the menu routs delete + put

	router.get('/user/:id', async (request, response, next) => {

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

	router.get('/users', async (request, response, next) => {

		let users,
			query = {};

		if (ObjectId.isValid(request.query.after)) {
			query = {
				_id: {
					$gt: ObjectId(request.query.after),
				},
			};
		}

		try {
			users = await User.find(query).limit(10);
		} catch (err) {
			return Promise.reject(err);
		}

		response.json(users || []);
	});

	return router;

};
