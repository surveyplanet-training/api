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
			name: 'Test Menu',
			items: [
			],
			showIngredients: true,
			showAmounts: true,
		};
		

		const menu = new Menu(options);

		let doc;

		try {
			doc = await menu.save();
		} catch (error) {
			expect(error).to.not.exist;
		}
		console.log(doc);

		expect(doc).to.exist;
		expect(doc.toObject()).to.have.any.keys(
			'_id',
			'user',
			'name',
			'items',
			'showIngredients',
			'showAmounts',
			'language',
		); 
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc.user).to.be.equal(options.user);
		expect(doc.name).to.be.equal(options.name);
		expect(doc.items).to.be.instanceOf(Array);
		expect(doc.showIngredients).to.be.equals(true);
		expect(doc.showAmounts).to.be.equals(true);
		menuId = doc._id;
		
	});

	it('should update a menu', async function () {

		const filter = { _id: menuId };
		const update = { name: 'name2' };
		console.log(filter);
		let doc;
		try {
			doc = await Menu.updateOne(filter, update);
		} catch (error) {
			expect(error).to.not.exist;
		}
		console.log(doc);
		
		expect(doc).to.exist;
		expect(doc).to.have.any.keys(
			'acknowledged',
			'matchedCount',
			'modifiedCount',
			'upsertedId',
			'upsertedCount',
		); 
		expect(doc.acknowledged).to.be.true;
		expect(doc.matchedCount).to.be.equal(1);
		expect(doc.modifiedCount).to.be.equal(1);
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
		
		expect(doc).to.exist;
		expect(doc).to.have.property('name');
		expect(doc.name).to.equal('name2');


	});

	it('should delete a menu', async function () {
		

		let doc;
		try {
			doc = await Menu.deleteOne({_id: menuId});
		} catch (error) {
			expect(error).to.not.exist;
		}
		expect(doc).to.exist;
		expect(doc).to.have.property('deletedCount');
		expect(doc.deletedCount).to.be.equal(1);
		
	});

	
});
