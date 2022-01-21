const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Restaurant = require('../../../lib/models/restaurant.js');


describe('Restaurant Unit Test', function () {

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
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc).to.have.property('user');
		expect(doc.user).to.be.equal(options.user);

		restaurantId = doc._id;
		
	});

	it('should update a restaurant', async function () {

		const filter = { _id: restaurantId };
		const update = { description: 'Tested the updating test' };

		let doc;
		try {
			doc = await Restaurant.updateOne(filter, update);
			
		} catch (error) {
			expect(error).to.not.exist;
		}
		expect(doc.matchedCount).to.be.equal(1);
		expect(doc.modifiedCount).to.be.equal(1);
		expect(doc.acknowledged).to.be.true;
		expect(doc.upsertedId).to.be.null;
		expect(doc.upsertedCount).to.be.equal(0);
	
	});
	
	it('should get a restaurant', async function () {

		
		let doc;
		try {
			doc = await Restaurant.findOne({_id: restaurantId});
		} catch (error) {
			expect(error).to.not.exist;
		}
		

		expect(doc.name).to.equal('Test Restaurant');
		expect(doc.description).to.equal('Tested the updating test');
		expect(doc.address.street).to.equal('123 Main St');
		expect(doc.address.street2).to.equal('');
		expect(doc.address.city).to.equal('Anytown');
		expect(doc.address.state).to.equal('CA');
		expect(doc.address.zip).to.equal('12345');
		expect(doc.address.country).to.equal('US');
		expect(doc.address.phone).to.equal('555-555-5555');
		expect(doc.description).to.be.equal('Tested the updating test');

	});

	it('should delete a restaurant', async function () {
		

		let doc;
		try {
			doc = await Restaurant.deleteOne({_id: restaurantId});
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc.deletedCount).to.be.equal(1);
		
	});

	
});
