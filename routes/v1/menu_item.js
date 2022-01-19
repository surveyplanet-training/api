const { ObjectId } = require('mongodb');

const Menu = require('../../lib/models/menu_item');

module.exports = function (router) {

	router.get('/menu_item/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let menu_item;

		try {
			menu_item = await Menu.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(menu_item || {});

	});

	// Update a menu_item item

	router.put('/menu_item/:id', async (request, response, next) => {

	});

	// Save new menu_item item

	router.post('/menu_item', async (request, response, next) => {
		
	});

	// Delete a menu_item item

	router.delete('/menu_item/:id', async (request, response, next) => {
		
	});


	router.get('/menu_items', async (request, response, next) => {

		let menu_items,
			query = {};

		if (ObjectId.isValid(request.query.after)) {
			query = {
				_id: {
					$gt: ObjectId(request.query.after),
				},
			};
		}

		try {
			menu_items = await Menu.find(query).limit(10);
		} catch (err) {
			return Promise.reject(err);
		}

		response.json(menu_items || []);
	});

	return router;

};
