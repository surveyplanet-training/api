const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe.skip('Theme Integration Test', function () {

	let themeCache;

	after(() => mongoose.disconnect());

	it('should create a theme', async function () {


		// 1. pass in theme data
		const data = {};

		const response = await request(app)
			.post('/v1/theme').send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check theme properties
		expect(response.body).to.have.properties('_id'); // 2. check theme properties
		themeCache = response.body;

		// 3. check if values are correct...

	});

	it('should update a theme', async function () {

		// 1. pass in theme update data. What are you going to upate?
		const data = {};
		const response = await request(app)
			.put(`/v1/theme/${themeCache._id}`)
			.send(data);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check theme properties
		expect(response.body).to.have.properties('_id'); // 2. check theme properties

		// 3. check if theme values are correct...


	});

	it('should retrieve a theme', async function () {

		const response = await request(app)
			.get(`/v1/theme/${themeCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check theme properties
		expect(response.body).to.have.properties('_id'); // 2. check theme properties

		// 3. check if theme values are correct...

	});

	it('should retrieve all themes for a user', async function () {

		const response = await request(app)
			.get('/v1/themes')
			.query({ user: themeCache.user });

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.be.an.instanceOf(Array);
		expect(response.body).to.have.above(1);

		// 2. check all theme items
		for (let index = 0; index < response.body.length; index++) {
			const item = response.body[index];
			
			// 3. check theme properties
			expect(item).to.have.properties('_id'); // 2. check theme properties

			// 4. check if theme values are correct...

		}

	});

	it('should delete a theme', async function () {

		const response = await request(app)
			.delete(`/v1/theme/${themeCache._id}`);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.have.property('deletedCount');
		expect(response.body).to.eql({ deletedCount: 1 });

	});
});
