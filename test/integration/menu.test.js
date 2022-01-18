const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');

describe('Menu API', function() {

	let menuCache;
	
		
	it('should create a menu', async function() {

		const data = {
			user: '',
			language: '',
			name: '',
			items: '',
			showIngredients: '',
			showAmounts: '',
		};

		const response = await request(app)
			.post('/menu')
			.send(data);

		expect(response.body).to.have.all.keys('header', 'status', 'body');
		expect(response.headers['Content-Type']).toMatch(/json/);
		expect(response.status).toEqual(200);
		expect(response.body).to.have.all.keys(
			'user',
			'language',
			'name',
			'items',
			'showIngredients',
			'showAmounts',
		);
		expect(response.body.user).to.equal('');
		expect(response.body.language).to.equal('');
		expect(response.body.name).to.equal('');
		expect(response.body.items).to.equal('');
		expect(response.body.showIngredients).to.equal('');
		expect(response.body.showAmounts).to.equal('');


		menuCache = response.body;
	});

	it('should update a menu', async function() {

		const data = {};
		const response = await request(app)
			.put('/menu')
			.send(data);
		expect(response.body).to.have.all.keys('header', 'status', 'body');
		expect(response.headers['Content-Type']).toMatch(/json/);
		expect(response.status).toEqual(200);

	});

	it('should retrieve a menu', async function() {

		const response = await request(app).get('/menu');

		expect(response.body).to.have.all.keys('header', 'status', 'body');
		expect(response.headers['Content-Type']).toMatch(/json/);
		expect(response.status).toEqual(200);
		expect(response.body).to.have.all.keys(
			'user',
			'language',
			'name',
			'items',
			'showIngredients',
			'showAmounts',
		);
		expect(response.body.user).to.equal('');
		expect(response.body.language).to.equal('');
		expect(response.body.name).to.equal('');
		expect(response.body.items).to.equal('');
		expect(response.body.showIngredients).to.equal('');
		expect(response.body.showAmounts).to.equal('');

	});

	it('should retrieve all menus for a user', async function() {

	});

	it('should delete a menu', async function() {

	});

});
