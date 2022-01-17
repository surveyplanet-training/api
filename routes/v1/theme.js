const { ObjectId } = require('mongodb');

const Menu = require('../../lib/models/theme');

module.exports = function (router) {

	router.get('/theme/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let theme;

		try {
			theme = await Menu.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(theme || {});

	});

	// Update a theme item

	router.put('/theme/:id', async (request, response, next) => {

	});

	// Save new theme item

	router.post('/theme', async (request, response, next) => {
		
	});

	// Delete a theme item

	router.delete('/theme/:id', async (request, response, next) => {
		
	});


	router.get('/themes', async (request, response, next) => {

		let themes,
			query = {};

		if (ObjectId.isValid(request.query.after)) {
			query = {
				_id: {
					$gt: ObjectId(request.query.after),
				},
			};
		}

		try {
			themes = await Menu.find(query).limit(10);
		} catch (err) {
			return Promise.reject(err);
		}

		response.json(themes || []);
	});

	return router;

};
