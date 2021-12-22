const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const MenuItem = require('../../../lib/models/menuItem.js');


describe('MenuItem', function () {

	let menuItemId;

	before( () => mongoose.connect(mongoUri) );

	after(() => mongoose.disconnect());

	it('should create a menuItem', async function () {

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
			name: 'Test MenuItem',
			description: 'Testing MenuItem Creation Unit Test',
		};

		const menuItem = new MenuItem(options);

		let doc;

		try {
			doc = await menuItem.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc).to.have.property('user');
		expect(doc.user).to.be.equal(options.user);

		menuItemId = doc._id;
		
	});

	it('should update a menuItem', async function () {

		const filter = { _id: menuItemId };
		const update = { description: 'Tested the updating test' };

		let doc;
		try {
			doc = await MenuItem.updateOne(filter, update);
		} catch (error) {
			expect(error).to.not.exist;
		}
		expect(doc.matchedCount).to.be.equal(1);
		expect(doc.modifiedCount).to.be.equal(1);
		expect(doc.acknowledged).to.be.true;
		expect(doc.upsertedId).to.be.null;
		expect(doc.upsertedCount).to.be.equal(0);
	
	});
	
	it('should get a menuItem', async function () {

		
		let doc;
		try {
			doc = await MenuItem.findOne({_id: menuItemId});
		} catch (error) {
			expect(error).to.not.exist;
		}
		

		expect(doc.name).to.equal('Test MenuItem');
		expect(doc.description).to.equal('Testing MenuItem Creation Unit Test');
		expect(doc.address.street).to.equal('123 Main St');
		expect(doc.address.street2).to.equal('');
		expect(doc.address.city).to.equal('Anytown');
		expect(doc.address.state).to.equal('CA');
		expect(doc.address.zip).to.equal('12345');
		expect(doc.address.country).to.equal('US');
		expect(doc.address.phone).to.equal('555-555-5555');

	});

	it('should delete a menuItem', async function () {
		

		let doc;
		try {
			doc = await MenuItem.deleteOne({_id: menuItemId});
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc.deletedCount).to.be.equal(1);
		
	});

	
});
