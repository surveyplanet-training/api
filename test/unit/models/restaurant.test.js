const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Restaurant = require('../../../lib/models/restaurant.js');
const { updateOne } = require('../../../lib/models/restaurant.js');
const { findOne } = require('../../../lib/models/restaurant.js');

describe('Restaurant', function () {

	let restaurantId;

	before( () => mongoose.connect(mongoUri) );

	after(() => mongoose.disconnect());

	it('should create a restaurant', async function () {

		const options = {
			user: new ObjectId(),
			address: {
				street: '123 Main St',
				street2: '',
				city: 'Anytown',
				state: 'CA',
				zip: '12345',
				country: 'US',
				phone: '555-555-5555',
			},
			name: 'Test Restaurant',
			description: 'Testing Restaurant Creation Unit Test',
		};

		const restaurant = new Restaurant(options);

		let doc;

		try {
			doc = await restaurant.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		// 1. ensure doc has the following properties: '_id', 'user', 'address', 'name', 'description', 'created', 'updated'
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc).to.have.property('user');
		expect(doc.user).to.be.equal(options.user);
		// 3. ensure all doc properties are set to the appropriate values
		// 4. cache the restaurant._id (restaurantId) so we can use it on the other test
		
	});

	it('should update a restaurant', async function () {

		const options = {
			user: new ObjectId(),
			address: {
				street: '123 Main St',
				street2: '',
				city: 'Anytown',
				state: 'CA',
				zip: '12345',
				country: 'US',
				phone: '555-555-5555',
			},
			name: 'Test Restaurant',
			description: 'Testing Restaurant Creation Unit Test',
		};

		const restaurant = new Restaurant(options);

		let doc;
		try {
			doc = await restaurant.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		const filter = { name: 'Test Restaurant' };
		const update = { description: 'Tested the updating test' };
		doc = await Restaurant.updateOne(filter, update);

		//expect(doc.description).to.be.equal('Tested the updating test');
		expect(doc.matchedCount).to.be.equal(1);
		expect(doc.modifiedCount).to.be.equal(1);
		expect(doc.acknowledged).to.be.true;
		expect(doc.upsertedId).to.be.null;
		expect(doc.upsertedCount).to.be.equal(0);
		


		// 1. Use Restaurant.updateOne() to update the restaurant
		// see: https://mongoosejs.com/docs/api/model.html#model_Model.updateOne
		// 2. Make sure the results are the correct values. e.g.:
		// matchedCount: 1
		// modifiedCount: 1
		// acknowledged: true
		// upsertedId: 0
		// upsertedCount: 0

		
	});
	
	it('should get a restaurant', async function () {

		const options = {
			user: new ObjectId(),
			address: {
				street: '123 Main St',
				street2: '',
				city: 'Anytown',
				state: 'CA',
				zip: '12345',
				country: 'US',
				phone: '555-555-5555',
			},
			name: 'Test Restaurant',
			description: 'Testing Restaurant Creation Unit Test',
		};
		const restaurant = new Restaurant(options);

		let doc;
		try {
			doc = await restaurant.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		const name = { name: 'Test Restaurant' };
		const description = {description: 'Testing Restaurant Creation Unit Test' };
		const street = { street: '123 Main St' };
		const street2 = { street2: '' };
		const city = { city: 'Anytown' };
		const state = { state: 'CA' };
		const zip = { zip: '12345' };
		const country = { country: 'US' };
		const phone = { phone: '555-555-5555' };
		
		
		doc = await Restaurant.findOne(options);

		expect(doc.name).to.equal('Test Restaurant');
		expect(doc.description).to.equal('Testing Restaurant Creation Unit Test');
		expect(doc.address.street).to.equal('123 Main St');
		expect(doc.address.street2).to.equal('');
		expect(doc.address.city).to.equal('Anytown');
		expect(doc.address.state).to.equal('CA');
		expect(doc.address.zip).to.equal('12345');
		expect(doc.address.country).to.equal('US');
		expect(doc.address.phone).to.equal('555-555-5555');

		// 1. Use Restaurant.findOne() to get the restaurant
		// see: htts://mongoosejs.com/docs/api/model.html#model_Model.findOne

		// 2. Make sure the results are the correct values
		
	});

	it('should delete a restaurant', async function () {
		// 1. Use Restaurant.deleteOne() to delete the restaurant
		// see: https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne

		// 2. Make sure the results are the correct values
		
	});

	
});
