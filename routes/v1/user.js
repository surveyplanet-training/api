const { ObjectId } = require('mongodb');

const User = require('../../lib/models/user');

module.exports = function (router) {
	
	router.get('/user', async (request, response, next) => {

		if (!ObjectId.isValid(request.query)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.query.id),
		};

		let user;

		try {
			user = await User.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(user || {});

	});


	// =============================================================================
	// U P D A T E
	// =============================================================================

	router.put('/user/:id', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let user;

		try {
			user = await User.findOneAndUpdate(query, request.body, { new: true });
		} catch (err) {
			next(err);
		}
		response.json(user || {});
	});



	router.post('/user', async function (request, response) {

		const user = new User(request.body);
		let doc;
		try {
			doc = await user.save();
		
		} catch (e) {
			return response.status(500).send(e);
		}
		response.json(doc);

	});


	router.delete('/user/:id', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(400).send('invalid');			
		}

		let user;

		try {
			user = await User.findByIdAndDelete(request.params.id);
		} catch (err) {
			next(err);
		}

		response.json(user || {});

	});

	return router;

};
