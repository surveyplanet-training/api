const { ObjectId } = require('mongodb');

const MenuItem = require('../../lib/models/menu_item');

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
			menu_item = await MenuItem.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(menu_item || {});

	});

	// Update a menu_item item

	router.put('/menu_item/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let menu_item;

		try {
			menu_item = await MenuItem.findOneAndUpdate(query, request.body, { new: true });
		} catch (err) {
			next(err);
		}

		response.json(menu_item || {});


	});

	// Save new menu_item item

	router.post('/menu_item', async (request, response, next) => {

		router.post('/menu', async (request, response, next) => {
			const MenuItem = new MenuItem(request.body);
	
			let doc;
	
			try {
				doc = await MenuItem.save();
			} catch (err) {
				console.error(err);
				response(500);
			}
	
			return response.json(doc);
		});
	
	});

	// Delete a menu_item item

	router.delete('/menu_item/:id', async (request, response, next) => {

		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let menu;

		try {
			menu = await MenuItem.deleteOne(query);
		} catch (err) {
			next(err);
		}

		response.json(menu || {});
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
			menu_items = await MenuItem.find(query).limit(10);
		} catch (err) {
			return Promise.reject(err);
		}

		response.json(menu_items || []);
	});

	return router;

};
