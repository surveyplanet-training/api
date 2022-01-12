const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const MenuItem = require('../../../lib/models/menu_item');


describe('MenuItem', function () {

	let menuItemId;

	before( () => mongoose.connect(mongoUri) );

	after(() => mongoose.disconnect());

	it('should create a menuItem', async function () {

		const tags = ['vegan', 'kosher', 'halal'];

		const options = {
			user: new ObjectId(),
			name : 'Test Menu Item',
			ingredients: [
				{
					_id: new ObjectId(),
				},
				{
					_id: new ObjectId(),	 
				},
				{
					_id: new ObjectId(), 
				},
			],
			description: 'This is a test menu item description',
			picture: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
			category: 'Main course',
			portion: [
				{
					size: 350,
					price: 20,
					currency: 'USD'
				},
				{
					size: 500,
					price: 30,
					currency: 'USD'
				},
			],
			tags: tags,
		
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
		expect(doc.category).to.be.equal('Main course');
		expect(doc.user).to.be.equal(options.user);
		expect(doc.tags).to.be.eql(tags);

		menuItemId = doc._id;
		
	});

	it('should update a menuItem', async function () {

		const filter = { _id: menuItemId };
		const update = {
			description: 'Tested the updating test',
			$push:{
				tag: ['fasting-friendly']
			}
		};

		let doc;
		try {
			doc = await MenuItem.updateOne(filter, update);
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
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

		expect(doc).to.exist;
		expect(doc.name).to.equal('Test Menu Item');
		expect(doc.description).to.equal('Tested the updating test');
		expect(doc.picture).to.equal('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
		expect(doc.category).to.equal('Main course');
		expect(doc.portion).to.exist;
		expect(doc.portion).to.be.an('array');
		expect(doc.portion).to.have.lengthOf(2);
		expect(doc.portion[0]).to.have.property('size');
		expect(doc.portion[0].size).to.equal(350);
		expect(doc.portion[0]).to.have.property('price');
		expect(doc.portion[0].price).to.equal(20);
		expect(doc.portion[0]).to.have.property('currency');
		expect(doc.portion[0].currency).to.equal('USD');

		expect(doc.portion[1]).to.have.property('size');
		expect(doc.portion[1].size).to.equal(500);
		expect(doc.portion[1]).to.have.property('price');
		expect(doc.portion[1].price).to.equal(30);
		expect(doc.portion[1]).to.have.property('currency');
		expect(doc.portion[1].currency).to.equal('USD');

		expect(doc.tags).to.include( 'fasting-friendly' );
		//expect(doc.ingredients).to.be.deep.equal([
		
	});

	it('should delete a menuItem', async function () {
		

		let doc;
		try {
			doc = await MenuItem.deleteOne({_id: menuItemId});
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc.deletedCount).to.be.equal(1);
		
	});

	
});
