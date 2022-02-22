const { ObjectId } = require('mongodb');

const Ingredient = require('../../lib/models/team');

module.exports = function (router) {

	router.get('/ingredient/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let ingredient;

		try {
			ingredient = await Ingredient.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(ingredient || {});

	});

	// Update a ingredient item
	router.put('/ingredient/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let ingredient;

		try {
			ingredient = await Ingredient.findOneAndUpdate(query, request.body, { new: true });
		} catch (err) {
			next(err);
		}

		response.json(ingredient || {});



	});
};