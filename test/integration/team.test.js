const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Ingredient Team Test', function () {

	let teamCache;

	after(() => mongoose.disconnect());

	it('should create a team', async function () {


		// 1. pass in team data
		const data = {};

		const response = await request(app)
			.post('/v1/team').send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check team properties
		expect(response.body).to.have.properties('_id'); // 2. check team properties
		teamCache = response.body;

		// 3. check if values are correct...

	});

	it('should update a team', async function () {

		// 1. pass in team update data. What are you going to upate?
		const data = {};
		const response = await request(app)
			.put(`/v1/team/${teamCache._id}`)
			.send(data);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check team properties
		expect(response.body).to.have.properties('_id'); // 2. check team properties

		// 3. check if team values are correct...


	});

	it('should retrieve a team', async function () {

		const response = await request(app)
			.get(`/v1/team/${teamCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		// 2. check team properties
		expect(response.body).to.have.properties('_id'); // 2. check team properties

		// 3. check if team values are correct...

	});

	it('should retrieve all teams for a user', async function () {

		const response = await request(app)
			.get('/v1/teams')
			.query({ user: teamCache.user });

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.be.an.instanceOf(Array);
		expect(response.body).to.have.above(1);

		// 2. check all team items
		for (let index = 0; index < response.body.length; index++) {
			const item = response.body[index];
			
			// 3. check team properties
			expect(item).to.have.properties('_id'); // 2. check team properties

			// 4. check if team values are correct...

		}

	});

	it('should delete a team', async function () {

		const response = await request(app)
			.delete(`/v1/team/${teamCache._id}`);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.have.property('deletedCount');
		expect(response.body).to.eql({ deletedCount: 1 });

	});
});
