const { ObjectId } = require('mongodb');

const Menu = require('../../lib/models/team');

module.exports = function (router) {

	router.get('/team/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let team;

		try {
			team = await Menu.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(team || {});

	});

	// Update a team item

	router.put('/team/:id', async (request, response, next) => {

	});

	// Save new team item

	router.post('/team', async (request, response, next) => {
		
	});

	// Delete a team item

	router.delete('/team/:id', async (request, response, next) => {
		
	});


	router.get('/teams', async (request, response, next) => {

		let teams,
			query = {};

		if (ObjectId.isValid(request.query.after)) {
			query = {
				_id: {
					$gt: ObjectId(request.query.after),
				},
			};
		}

		try {
			teams = await Menu.find(query).limit(10);
		} catch (err) {
			return Promise.reject(err);
		}

		response.json(teams || []);
	});

	return router;

};
