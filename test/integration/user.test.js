const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe.skip('User Integration Test', function () {

	let userCache;

	after(() => mongoose.disconnect());

	it('should create a user', async function () {


		// 1. pass in user data
		const data = {};

		const response = await request(app)
			.post('/v1/user').send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check user properties
		expect(response.body).to.have.properties('_id'); // 2. check user properties
		userCache = response.body;

		// 3. check if values are correct...

	});

	it('should update a user', async function () {

		// 1. pass in user update data. What are you going to upate?
		const data = {};
		const response = await request(app)
			.put(`/v1/user/${userCache._id}`)
			.send(data);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check user properties
		expect(response.body).to.have.properties('_id'); // 2. check user properties

		// 3. check if user values are correct...


	});

	it('should retrieve a user', async function () {

		const response = await request(app)
			.get(`/v1/user/${userCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check user properties
		expect(response.body).to.have.properties('_id'); // 2. check user properties

		// 3. check if user values are correct...

	});

	it('should retrieve all users for a user', async function () {

		const response = await request(app)
			.get('/v1/users')
			.query({ user: userCache.user });

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.be.an.instanceOf(Array);
		expect(response.body).to.have.above(1);

		// 2. check all user items
		for (let index = 0; index < response.body.length; index++) {
			const item = response.body[index];
			
			// 3. check user properties
			expect(item).to.have.properties('_id'); // 2. check user properties

			// 4. check if user values are correct...

		}

	});

	it('should delete a user', async function () {

		const response = await request(app)
			.delete(`/v1/user/${userCache._id}`);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.have.property('deletedCount');
		expect(response.body).to.eql({ deletedCount: 1 });

	});
});
