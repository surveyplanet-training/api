const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Menu = require('../../../lib/models/menu.js');


describe('Menu', function () {

	let menuId;

	before( () => mongoose.connect(mongoUri) );

	after(() => mongoose.disconnect());

	it('should create a menu', async function () {

		const options = {
			user: new ObjectId(),
			language: { type: String, default: 'en' },
			name: 'Test Menu',
			items: [
				{
					type: ObjectId,
					//1
					//2
					//3
				},
				
			],
			showIngredients: Boolean,
			showAmmounts: Boolean,
		};
		

		const menu = new Menu(options);

		let doc;

		try {
			doc = await menu.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc).to.have.property('user');
		expect(doc.user).to.be.equal(options.user);

		menuId = doc._id;
		
	});

	it('should update a menu', async function () {

		const filter = { _id: menuId };
		const update = { description: 'Tested the updating test' };

		let doc;
		try {
			doc = await Menu.updateOne(filter, update);
		} catch (error) {
			expect(error).to.not.exist;
		}
		expect(doc.matchedCount).to.be.equal(1);
		expect(doc.modifiedCount).to.be.equal(1);
		expect(doc.acknowledged).to.be.true;
		expect(doc.upsertedId).to.be.null;
		expect(doc.upsertedCount).to.be.equal(0);
	
	});
	
	it('should get a menu', async function () {

		
		let doc;
		try {
			doc = await Menu.findOne({_id: menuId});
		} catch (error) {
			expect(error).to.not.exist;
		}
		

		expect(doc.name).to.equal('Test Menu');
		expect(doc.description).to.equal('Testing Menu Creation Unit Test');
		expect(doc.address.street).to.equal('123 Main St');
		expect(doc.address.street2).to.equal('');
		expect(doc.address.city).to.equal('Anytown');
		expect(doc.address.state).to.equal('CA');
		expect(doc.address.zip).to.equal('12345');
		expect(doc.address.country).to.equal('US');
		expect(doc.address.phone).to.equal('555-555-5555');

	});

	it('should delete a menu', async function () {
		

		let doc;
		try {
			doc = await Menu.deleteOne({_id: menuId});
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc.deletedCount).to.be.equal(1);
		
	});

	
});
