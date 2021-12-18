const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Restaurant = require('../../../lib/models/restaurant.js');

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
		expect(doc).to.have.property('_id', 'Resurant does not have an id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc).to.have.property('user');
		expect(doc.user).to.be.equal(options.user);
		// 2. ensure doc.address has the appropriate properties
		// 3. ensure all doc properties are set to the appropriate values
		// 4. save the restaurant _id so we can use it on the other test
		
	});

	it('should update a restaurant', async function () {
		// see: https://mongoosejs.com/docs/api/model.html#model_Model.updateOne
	});
	
	it('should get a restaurant', async function () {
		// see: https://mongoosejs.com/docs/api/model.html#model_Model.findOne
	});

	it('should delete a restaurant', async function () {
		// see: https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne
	});

	
});
