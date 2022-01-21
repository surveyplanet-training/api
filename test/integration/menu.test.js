const { expect } = require('chai');
const { ObjectId } = require('mongoose').Types;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Menu', function () {
	let menuCache;

	after(() => mongoose.disconnect());

	it('should create a menu', async function () {
		const data = {
			user: new ObjectId(),
			name: 'Integration Test Menu',
			items: [],
			showIngredients: true,
			showAmounts: true,
		};

		const response = await request(app).post('/v1/menu').send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);

		expect(response.body).to.have.properties('user', 'language', 'name', 'items', 'showIngredients', 'showAmounts');

		menuCache = response.body;
		expect(response.body.user).to.equal(data.user.toString());
		expect(response.body.language).to.equal('en');
		expect(response.body.name).to.equal(data.name);
		expect(response.body.items).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.showIngredients).to.equal(data.showIngredients);
		expect(response.body.showAmounts).to.equal(data.showAmounts);
	});

	it('should update a menu', async function () {
		const data = { name: 'updated name' };
		const response = await request(app).put(`/v1/menu/${menuCache._id}`).send(data);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body.user).to.equal(menuCache.user.toString());
		expect(response.body.language).to.equal(menuCache.language);
		expect(response.body.name).to.equal(data.name);
		expect(response.body.items).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.showIngredients).to.equal(menuCache.showIngredients);
		expect(response.body.showAmounts).to.equal(menuCache.showAmounts);
	});

	it('should retrieve a menu', async function () {
		const response = await request(app).get(`/v1/menu/${menuCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);

		expect(response.body).to.have.properties('user', 'language', 'name', 'items', 'showIngredients', 'showAmounts');

		menuCache = response.body;
		expect(response.body.user).to.equal(menuCache.user.toString());
		expect(response.body.language).to.equal(menuCache.language);
		expect(response.body.name).to.equal(menuCache.name);
		expect(response.body.items).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.showIngredients).to.equal(menuCache.showIngredients);
		expect(response.body.showAmounts).to.equal(menuCache.showAmounts);
	});

	it('should retrieve all menus for a user', async function () {
		const response = await request(app).get('/v1/menus').query({ user: menuCache.user });

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.be.an.instanceOf(Array);
		expect(response.body).to.have.lengthOf(1);

		expect(response.body[0].user).to.equal(menuCache.user.toString());
		expect(response.body[0].language).to.equal(menuCache.language);
		expect(response.body[0].name).to.equal(menuCache.name);
		expect(response.body[0].items).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body[0].showIngredients).to.equal(menuCache.showIngredients);
		expect(response.body[0].showAmounts).to.equal(menuCache.showAmounts);
	});

	it('should delete a menu', async function () {
		const response = await request(app).delete(`/v1/menu/${menuCache._id}`);

		expect(response).to.have.properties('header', 'status', 'body');

		expect(response.body).to.eql({ deletedCount: 1 });
	});
});
