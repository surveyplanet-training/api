const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Integration User Test', function () {

	let userCache;

	after(() => mongoose.disconnect());

	it('should create a user', async function () {
		// 1. pass in user data
		const data = {
			name: {
				first: 'Integration',
				last: 'Test',
			},
			email: `${(new Date().getTime()).toString(36)}@example.com`,
			phone:'1234567890',
			photo: 'http://www.google.com',
			//created: new Date(),
			//updated: new Date(),
			//loggedIn: new Date(),
			password: 'password',
			passReset: {
				hash: 'hash',
				expires: new Date(),
			},
			ip: '123.111.3123.123',
			notes: 'he was a good fella',
			preferences: {
				currency: 'USD',
			},
		};
		const response = await request(app)
			.post('/v1/user').send(data);
		console.log(response.headers, response.status, response.body);
		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);
		expect(response.body).to.have.properties(
			'_id',
			'name',
			'email',
			'phone',
			'photo',
			'created',
			'updated',
			//'loggedIn',
			'verified',
			'password',
			'passReset',
			'ip',
			'notes',
			'preferences'
		);
		userCache = response.body;
		expect(response.body.name).to.deep.equal(data.name);
		expect(response.body.email).to.equal(data.email);
		expect(response.body.phone).to.equal(data.phone);
		expect(response.body.photo).to.equal(data.photo);
		expect(response.body.created).to.exist;
		expect(response.body.updated).to.exist;
		//expect(response.body.loggedIn).to.equal(data.loggedIn.toISOString());
		expect(response.body.verified).to.have.properties(
			'hash',
			'expires',
			'date'
		);
		expect(response.body.verified.hash).to.equal(data.verified.hash);
		expect(response.body.verified.expires).to.equal(data.verified.expires.toISOString());
		expect(response.body.verified.date).to.equal(data.verified.date.toISOString());
		expect(response.body.password).to.equal(data.password);
		expect(response.body.passReset).to.have.properties(
			'hash',
			'expires'
		);
		expect(response.body.passReset.hash).to.equal(data.passReset.hash);
		expect(response.body.passReset.expires).to.equal(data.passReset.expires.toISOString());
		expect(response.body.ip).to.equal(data.ip);
		expect(response.body.notes).to.equal(data.notes);
		expect(response.body.preferences).to.have.properties(
			'currency'
		);
		expect(response.body.preferences.currency).to.equal(data.preferences.currency);
	});

	//write roots for this test
	// 3. check if values are correct...

	it('should update a user', async function () {

		// 1. pass in user update data. What are you going to upate?
		const data = {
			name: {
				first: 'Integration1',
				last: 'Test1',
			},
			email: 'test@email1.com',
			phone:'12345678901',
			photo: 'http://www.google1.com',
			created: new Date(),
			updated: new Date(),
			loggedIn: new Date(),
			verified: {
				hash: 'hash',
				expires: new Date(),
				date: new Date(),
			},
			password: 'password',
			passReset: {
				hash: 'hash',
				expires: new Date(),
			},
			ip: '123.111.3123.123',
			notes: 'he was a good fella',
			preferences: {
				currency: 'USD',
			},		
			timestamps: {
				createdAt: 'created',
				updatedAt: 'updated',
			}
			
		};
		const response = await request(app)
			.put(`/v1/user/${userCache._id}`)
			.send(data);

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);

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

