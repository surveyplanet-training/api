const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const  Theme = require('../../../lib/models/theme.js');


describe(' Theme', function () {

	let themeId;

	before( () => mongoose.connect(mongoUri) );

	after(() => mongoose.disconnect());

	it('should create a theme', async function () {

		const options = new Theme({
			name: 'theme1',
			font: 'helvetica',
			css: 'this is an imaginary css code',
			template: true,
			user: { type: ObjectId, ref: 'User' },
		});
		

		const theme = new  Theme(options);

		let doc;

		try {
			doc = await theme.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect( doc.toObject() ).to.have.any.keys(
			'_id',
			'user',
			'name',
			'items',
			'showIngredients',
			'showAmounts',
			'language',
		); 
		themeId = doc._id;
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc.user).to.be.equal(options.user);
		expect(doc.name).to.be.equal(options.name);
		expect(doc.showIngredients).to.be.equals(true);
		expect(doc.showAmounts).to.be.equals(true);
		
	});

	it('should update a theme', async function () {

		const filter = { _id: themeId };
		const update = { name: 'name2' };
		let doc;
		try {
			doc = await  Theme.updateOne(filter, update);
		} catch (error) {
			expect(error).to.not.exist;
		}
		
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
	
	it('should get a theme', async function () {

		
		let doc;
		try {
			doc = await  Theme.findOne({_id: themeId});
		} catch (error) {
			expect(error).to.not.exist;
		}
		
		expect(doc).to.exist;
		expect(doc).to.have.property('name');
		expect(doc.name).to.equal('name2');


	});

	it('should delete a theme', async function () {
		

		let doc;
		try {
			doc = await  Theme.deleteOne({_id: themeId});
		} catch (error) {
			expect(error).to.not.exist;
		}
		expect(doc).to.exist;
		expect(doc).to.have.property('deletedCount');
		expect(doc.deletedCount).to.be.equal(1);
		
	});


});
