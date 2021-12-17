const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Restaurant = require('../../../lib/models/restaurant.js');

describe('Restaurant', function () {
	before(function () {
		mongoose.connect(mongoUri);
	});
	it('should create a restaurant', async function () {
		const restaurant = new Restaurant({
			user: new ObjectId(),
			address: {
				street: '',
				street2: '', // optional
				city: '',
				state: '',
				zip: '',
				country: '',
				phone: '',
			},
			name: 'Test Restaurant',
			description: 'Testing Restaurant Creation Unit Test',
		});
		let doc;
		try {
			doc = await restaurant.save();
		} catch (error) {
			expect(error).to.not.exist;
		}
		expect(doc).to.exist;
	});
	it('should update a restaurant', async function () {});
	it('should get a restaurant', async function () {});
	it('should delete a restaurant', async function () {});
});
