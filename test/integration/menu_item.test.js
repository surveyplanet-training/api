const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Ingredient Menu Item Test', function () {

	let menuItemCache;

	after(() => mongoose.disconnect());

	it('should create a menuItem', async function () {


		// 1. pass in menuItem data
		const data = {};

		const response = await request(app)
			.post('/v1/menuItem').send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check menuItem properties
		expect(response.body).to.have.properties('_id'); // 2. check menuItem properties
		menuItemCache = response.body;

		// 3. check if values are correct...

	});

	it('should update a menuItem', async function () {

		// 1. pass in menuItem update data. What are you going to upate?
		const data = {};
		const response = await request(app)
			.put(`/v1/menuItem/${menuItemCache._id}`)
			.send(data);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check menuItem properties
		expect(response.body).to.have.properties('_id'); // 2. check menuItem properties

		// 3. check if menuItem values are correct...


	});

	it('should retrieve a menuItem', async function () {

		const response = await request(app)
			.get(`/v1/menuItem/${menuItemCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check menuItem properties
		expect(response.body).to.have.properties('_id'); // 2. check menuItem properties

		// 3. check if menuItem values are correct...

	});

	it('should retrieve all menuItems for a user', async function () {

		const response = await request(app)
			.get('/v1/menuItems')
			.query({ user: menuItemCache.user });

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.be.an.instanceOf(Array);
		expect(response.body).to.have.above(1);

		// 2. check all menuItem items
		for (let index = 0; index < response.body.length; index++) {
			const item = response.body[index];
			
			// 3. check menuItem properties
			expect(item).to.have.properties('_id'); // 2. check menuItem properties

			// 4. check if menuItem values are correct...

		}

	});

	it('should delete a menuItem', async function () {

		const response = await request(app)
			.delete(`/v1/menuItem/${menuItemCache._id}`);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.have.property('deletedCount');
		expect(response.body).to.eql({ deletedCount: 1 });

	});
});
