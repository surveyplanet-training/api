const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe.skip('Integration Ingredient Test', function () {

	let ingredientCache;

	//after(() => mongoose.disconnect());

	it('should create a ingredient', async function () {


		// 1. pass in ingredient data
		const data = {};

		const response = await request(app)
			.post('/v1/ingredient').send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check ingredient properties
		expect(response.body).to.have.properties('_id'); // 2. check ingredient properties
		ingredientCache = response.body;

		// 3. check if values are correct...

	});

	it('should update a ingredient', async function () {

		// 1. pass in ingredient update data. What are you going to upate?
		const data = {};
		const response = await request(app)
			.put(`/v1/ingredient/${ingredientCache._id}`)
			.send(data);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check ingredient properties
		expect(response.body).to.have.properties('_id'); // 2. check ingredient properties

		// 3. check if ingredient values are correct...


	});

	it('should retrieve a ingredient', async function () {

		const response = await request(app)
			.get(`/v1/ingredient/${ingredientCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check ingredient properties
		expect(response.body).to.have.properties('_id'); // 2. check ingredient properties

		// 3. check if ingredient values are correct...

	});

	it('should retrieve all ingredients for a user', async function () {

		const response = await request(app)
			.get('/v1/ingredients')
			.query({ user: ingredientCache.user });

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.be.an.instanceOf(Array);
		expect(response.body).to.have.above(1);

		// 2. check all ingredient items
		for (let index = 0; index < response.body.length; index++) {
			const item = response.body[index];
			
			// 3. check ingredient properties
			expect(item).to.have.properties('_id'); // 2. check ingredient properties

			// 4. check if ingredient values are correct...

		}

	});

	it('should delete a ingredient', async function () {

		const response = await request(app)
			.delete(`/v1/ingredient/${ingredientCache._id}`);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.have.property('deletedCount');
		expect(response.body).to.eql({ deletedCount: 1 });

	});
});
