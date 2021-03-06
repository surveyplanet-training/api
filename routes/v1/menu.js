const { ObjectId } = require('mongodb');

const Menu = require('../../lib/models/menu');

module.exports = function (router) {


	router.get('/menu/:id', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(404).send('Not Found');
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let menu;

		try {
			menu = await Menu.findOne(query);
		} catch (err) {
			next(err);
		}

		response.json(menu);

	});

	// Update a menu item
	router.put('/menu/:id', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let menu;

		try {
			menu = await Menu.findOneAndUpdate(query, request.body, { new: true });
		} catch (err) {
			next(err);
		}

		response.json(menu || {});
	});

	// Save new menu item

	router.post('/menu', async (request, response, next) => {
		const menu = new Menu(request.body);

		let doc;

		try {
			doc = await menu.save();
		} catch (err) {
			console.error(err);
			response(500);
		}

		return response.json(doc);
	});

	// Delete a menu item

	router.delete('/menu/:id', async (request, response, next) => {
		if (!ObjectId.isValid(request.params.id)) {
			return response.status(401);
		}

		const query = {
			_id: ObjectId(request.params.id),
		};

		let menu;

		try {
			menu = await Menu.deleteOne(query);
		} catch (err) {
			next(err);
		}

		response.json(menu || {});
	});

	router.get('/menus', async (request, response, next) => {
		let menus,
			query = {};

		if (ObjectId.isValid(request.query.user)) {
			query = {
				user: ObjectId(request.query.user),
			};
		}

		try {
			menus = await Menu.find(query);
		} catch (err) {
			return Promise.reject(err);
		}

		response.json(menus || []);
	});

	return router;
};
