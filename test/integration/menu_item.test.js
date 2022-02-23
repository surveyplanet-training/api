const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');

describe.skip('Integration Menu Item Test', function () {

	let menuItemCache;

	it('should create a menu item', async function () {
		const data = {
			name: 'Integration Test Menu Item',
			ingredients: [],
			amounts: [],
			showIngredients: true,
			showAmounts: true,
		};

		const response = await request(app).post('/v1/menu-item').send(data);

		expect(response).to.have.properties('headers', 'status', 'body');

		expect(response.headers['content-type']).to.match(/^application\/json/);
		expect(response.status).to.equal(200);

		expect(response.body).to.have.properties(
			'user',
			'language',
			'name',
			'ingredients',
			'amounts',
			'showIngredients',
			'showAmounts'
		);

		menuItemCache = response.body;

		expect(response.body.user).to.equal(data.user);
		expect(response.body.language).to.equal('en');
		expect(response.body.name).to.equal(data.name);
		expect(response.body.ingredients).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.amounts).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.showIngredients).to.equal(data.showIngredients);
		expect(response.body.showAmounts).to.equal(data.showAmounts);
	});

	it('should update a menu item', async function () {
		const data = { name: 'updated name' };
		const response = await request(app).put(`/v1/menu-item/${menuItemCache._id}`).send(data);

		expect(response).to.have.properties('headers', 'status', 'body');
		expect(response.body.user).to.equal(menuItemCache.user);

		expect(response.body.language).to.equal(menuItemCache.language);
		expect(response.body.name).to.equal(data.name);
		expect(response.body.ingredients).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.amounts).to.be.an.instanceof(Array).that.is.empty;
		expect(response.body.showIngredients).to.equal(menuItemCache.showIngredients);
		expect(response.body.showAmounts).to.equal(menuItemCache.showAmounts);
	});
});
