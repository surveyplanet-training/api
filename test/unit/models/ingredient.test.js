const { expect } = require('chai');
const { mongoUri } = require('../../../lib/definitions');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Ingredient = require('../../../lib/models/ingredient');

describe('Ingredient Unit Test', function () {
	before(() => mongoose.connect(mongoUri));
	after(() => mongoose.disconnect());

	let ingredientId;

	it('should create an ingredient', async function () {
		const options = {
			name: 'Test Ingredient',
			code: 'test-ingredient',
			description: 'this is a test ingredient',
			user: new ObjectId(),
			protein: {
				amount: 123,
				unit: 'g',
			},
			lipids: {
				amount: 123,
				unit: 'g',
			},
			carbohydrates: {
				amount: 123,
				unit: 'g',
			},
			energy: {
				amount: 123,
				unit: 'g',
			},
			fibers: {
				amount: 123,
				unit: 'g',
			},
			choline: {
				amount: 123,
				unit: 'g',
			},
			minerals: {
				calcium: {
					amount: 123,
					unit: 'g',
				},
				iron: {
					amount: 123,
					unit: 'g',
				},
				magnesium: {
					amount: 123,
					unit: 'g',
				},
				phosphorus: {
					amount: 123,
					unit: 'g',
				},
				potassium: {
					amount: 123,
					unit: 'g',
				},
				sodium: {
					amount: 123,
					unit: 'g',
				},
				zinc: {
					amount: 123,
					unit: 'g',
				},
				copper: {
					amount: 123,
					unit: 'g',
				},
				selenium: {
					amount: 123,
					unit: 'g',
				},
			},
			vitamins: {
				A1: {
					amount: 123,
					unit: 'g',
				},
				A: {
					amount: 123,
					unit: 'g',
				},
				caroteneAlpha: {
					amount: 123,
					unit: 'g',
				},
				caroteneBeta: {
					amount: 123,
					unit: 'g',
				},
				B1: {
					amount: 123,
					unit: 'g',
				},
				B2: {
					amount: 123,
					unit: 'g',
				},
				B3: {
					amount: 123,
					unit: 'g',
				},
				B5: {
					amount: 123,
					unit: 'g',
				},
				B6: {
					amount: 123,
					unit: 'g',
				},
				B7: {
					amount: 123,
					unit: 'g',
				},
				B9: {
					amount: 123,
					unit: 'g',
				},
				B12: {
					amount: 123,
					unit: 'g',
				},
				C: {
					amount: 123,
					unit: 'g',
				},
				D: {
					amount: 123,
					unit: 'g',
				},
				E: {
					amount: 123,
					unit: 'g',
				},
				K: {
					amount: 123,
					unit: 'g',
				},
			},
		};

		const ingredient = new Ingredient(options);

		let doc;

		try {
			doc = await ingredient.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc.name).to.be.equal(options.name);
		expect(doc.code).to.be.equal(options.code);
		expect(doc.user).to.be.instanceOf(ObjectId);

		expect(doc.protein.amount).to.be.equal(options.protein.amount);
		expect(doc.lipids.amount).to.be.equal(options.lipids.amount);
		expect(doc.carbohydrates.amount).to.be.equal(options.carbohydrates.amount);
		expect(doc.energy.amount).to.be.equal(options.energy.amount);
		expect(doc.fibers.amount).to.be.equal(options.fibers.amount);
		expect(doc.choline.amount).to.be.equal(options.choline.amount);
		expect(doc.minerals.calcium.amount).to.be.equal(options.minerals.calcium.amount);
		expect(doc.minerals.iron.amount).to.be.equal(options.minerals.iron.amount);
		expect(doc.minerals.magnesium.amount).to.be.equal(options.minerals.magnesium.amount);
		expect(doc.minerals.phosphorus.amount).to.be.equal(options.minerals.phosphorus.amount);
		expect(doc.minerals.potassium.amount).to.be.equal(options.minerals.potassium.amount);
		expect(doc.minerals.sodium.amount).to.be.equal(options.minerals.sodium.amount);
		expect(doc.minerals.zinc.amount).to.be.equal(options.minerals.zinc.amount);
		expect(doc.minerals.copper.amount).to.be.equal(options.minerals.copper.amount);
		expect(doc.minerals.selenium.amount).to.be.equal(options.minerals.selenium.amount);
		expect(doc.vitamins.A1.amount).to.be.equal(options.vitamins.A1.amount);
		expect(doc.vitamins.A.amount).to.be.equal(options.vitamins.A.amount);
		expect(doc.vitamins.caroteneAlpha.amount).to.be.equal(options.vitamins.caroteneAlpha.amount);
		expect(doc.vitamins.caroteneBeta.amount).to.be.equal(options.vitamins.caroteneBeta.amount);
		expect(doc.vitamins.B1.amount).to.be.equal(options.vitamins.B1.amount);
		expect(doc.vitamins.B2.amount).to.be.equal(options.vitamins.B2.amount);
		expect(doc.vitamins.B3.amount).to.be.equal(options.vitamins.B3.amount);
		expect(doc.vitamins.B5.amount).to.be.equal(options.vitamins.B5.amount);
		expect(doc.vitamins.B6.amount).to.be.equal(options.vitamins.B6.amount);
		expect(doc.vitamins.B7.amount).to.be.equal(options.vitamins.B7.amount);
		expect(doc.vitamins.B9.amount).to.be.equal(options.vitamins.B9.amount);
		expect(doc.vitamins.B12.amount).to.be.equal(options.vitamins.B12.amount);
		expect(doc.vitamins.C.amount).to.be.equal(options.vitamins.C.amount);
		expect(doc.vitamins.D.amount).to.be.equal(options.vitamins.D.amount);
		expect(doc.vitamins.E.amount).to.be.equal(options.vitamins.E.amount);
		expect(doc.vitamins.K.amount).to.be.equal(options.vitamins.K.amount);

		expect(doc.protein.unit).to.be.equal(options.protein.unit);
		expect(doc.lipids.unit).to.be.equal(options.lipids.unit);
		expect(doc.carbohydrates.unit).to.be.equal(options.carbohydrates.unit);
		expect(doc.energy.unit).to.be.equal(options.energy.unit);
		expect(doc.fibers.unit).to.be.equal(options.fibers.unit);
		expect(doc.choline.unit).to.be.equal(options.choline.unit);
		expect(doc.minerals.calcium.unit).to.be.equal(options.minerals.calcium.unit);
		expect(doc.minerals.iron.unit).to.be.equal(options.minerals.iron.unit);
		expect(doc.minerals.magnesium.unit).to.be.equal(options.minerals.magnesium.unit);
		expect(doc.minerals.phosphorus.unit).to.be.equal(options.minerals.phosphorus.unit);
		expect(doc.minerals.potassium.unit).to.be.equal(options.minerals.potassium.unit);
		expect(doc.minerals.sodium.unit).to.be.equal(options.minerals.sodium.unit);
		expect(doc.minerals.zinc.unit).to.be.equal(options.minerals.zinc.unit);
		expect(doc.minerals.copper.unit).to.be.equal(options.minerals.copper.unit);
		expect(doc.minerals.selenium.unit).to.be.equal(options.minerals.selenium.unit);
		expect(doc.vitamins.A1.unit).to.be.equal(options.vitamins.A1.unit);
		expect(doc.vitamins.A.unit).to.be.equal(options.vitamins.A.unit);
		expect(doc.vitamins.caroteneAlpha.unit).to.be.equal(options.vitamins.caroteneAlpha.unit);
		expect(doc.vitamins.caroteneBeta.unit).to.be.equal(options.vitamins.caroteneBeta.unit);
		expect(doc.vitamins.B1.unit).to.be.equal(options.vitamins.B1.unit);
		expect(doc.vitamins.B2.unit).to.be.equal(options.vitamins.B2.unit);
		expect(doc.vitamins.B3.unit).to.be.equal(options.vitamins.B3.unit);
		expect(doc.vitamins.B5.unit).to.be.equal(options.vitamins.B5.unit);
		expect(doc.vitamins.B6.unit).to.be.equal(options.vitamins.B6.unit);
		expect(doc.vitamins.B7.unit).to.be.equal(options.vitamins.B7.unit);
		expect(doc.vitamins.B9.unit).to.be.equal(options.vitamins.B9.unit);
		expect(doc.vitamins.B12.unit).to.be.equal(options.vitamins.B12.unit);
		expect(doc.vitamins.C.unit).to.be.equal(options.vitamins.C.unit);
		expect(doc.vitamins.D.unit).to.be.equal(options.vitamins.D.unit);
		expect(doc.vitamins.E.unit).to.be.equal(options.vitamins.E.unit);
		expect(doc.vitamins.K.unit).to.be.equal(options.vitamins.K.unit);
		ingredientId = doc._id;
	});

	it('should update an ingredient', async function () {
		const filter = { _id: ingredientId };
		const update = {
			description: 'Tested the updating test',
			C: {
				amount: 134,
				unit: 'mg',
			},
		};

		let doc;
		try {
			doc = await Ingredient.updateOne(filter, update);
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

	it('should get an ingredient', async function () {
		let doc;

		try {
			doc = await Ingredient.findOne({ _id: ingredientId });
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc.name).to.equal('Test Ingredient');
		expect(doc.description).to.equal('Tested the updating test');
		expect(doc.minerals).to.have.all.keys(
			'calcium',
			'iron',
			'magnesium',
			'phosphorus',
			'potassium',
			'sodium',
			'zinc',
			'copper',
			'selenium'
		);
		expect(doc.vitamins).to.have.all.keys(
			'A1',
			'A',
			'caroteneAlpha',
			'caroteneBeta',
			'B1',
			'B2',
			'B3',
			'B5',
			'B6',
			'B7',
			'B9',
			'B12',
			'C',
			'D',
			'E',
			'K'
		);
		expect(doc.protein.amount).to.be.equal(123);
		expect(doc.lipids.amount).to.be.equal(123);
		expect(doc.carbohydrates.amount).to.be.equal(123);
		expect(doc.energy.amount).to.be.equal(123);
		expect(doc.fibers.amount).to.be.equal(123);
		expect(doc.choline.amount).to.be.equal(123);
		expect(doc.minerals.calcium.amount).to.be.equal(123);
		expect(doc.minerals.iron.amount).to.be.equal(123);
		expect(doc.minerals.magnesium.amount).to.be.equal(123);
		expect(doc.minerals.phosphorus.amount).to.be.equal(123);
		expect(doc.minerals.potassium.amount).to.be.equal(123);
		expect(doc.minerals.sodium.amount).to.be.equal(123);
		expect(doc.minerals.zinc.amount).to.be.equal(123);
		expect(doc.minerals.copper.amount).to.be.equal(123);
		expect(doc.minerals.selenium.amount).to.be.equal(123);
		expect(doc.vitamins.A1.amount).to.be.equal(123);
		expect(doc.vitamins.A.amount).to.be.equal(123);
		expect(doc.vitamins.caroteneAlpha.amount).to.be.equal(123);
		expect(doc.vitamins.caroteneBeta.amount).to.be.equal(123);
		expect(doc.vitamins.B1.amount).to.be.equal(123);
		expect(doc.vitamins.B2.amount).to.be.equal(123);
		expect(doc.vitamins.B3.amount).to.be.equal(123);
		expect(doc.vitamins.B5.amount).to.be.equal(123);
		expect(doc.vitamins.B6.amount).to.be.equal(123);
		expect(doc.vitamins.B7.amount).to.be.equal(123);
		expect(doc.vitamins.B9.amount).to.be.equal(123);
		expect(doc.vitamins.B12.amount).to.be.equal(123);
		expect(doc.vitamins.C.amount).to.be.equal(123);
		expect(doc.vitamins.D.amount).to.be.equal(123);
		expect(doc.vitamins.E.amount).to.be.equal(123);
		expect(doc.vitamins.K.amount).to.be.equal(123);

		expect(doc.protein.unit).to.be.equal('g');
		expect(doc.lipids.unit).to.be.equal('g');
		expect(doc.carbohydrates.unit).to.be.equal('g');
		expect(doc.energy.unit).to.be.equal('g');
		expect(doc.fibers.unit).to.be.equal('g');
		expect(doc.choline.unit).to.be.equal('g');
		expect(doc.minerals.calcium.unit).to.be.equal('g');
		expect(doc.minerals.iron.unit).to.be.equal('g');
		expect(doc.minerals.magnesium.unit).to.be.equal('g');
		expect(doc.minerals.phosphorus.unit).to.be.equal('g');
		expect(doc.minerals.potassium.unit).to.be.equal('g');
		expect(doc.minerals.sodium.unit).to.be.equal('g');
		expect(doc.minerals.zinc.unit).to.be.equal('g');
		expect(doc.minerals.copper.unit).to.be.equal('g');
		expect(doc.minerals.selenium.unit).to.be.equal('g');
		expect(doc.vitamins.A1.unit).to.be.equal('g');
		expect(doc.vitamins.A.unit).to.be.equal('g');
		expect(doc.vitamins.caroteneAlpha.unit).to.be.equal('g');
		expect(doc.vitamins.caroteneBeta.unit).to.be.equal('g');
		expect(doc.vitamins.B1.unit).to.be.equal('g');
		expect(doc.vitamins.B2.unit).to.be.equal('g');
		expect(doc.vitamins.B3.unit).to.be.equal('g');
		expect(doc.vitamins.B5.unit).to.be.equal('g');
		expect(doc.vitamins.B6.unit).to.be.equal('g');
		expect(doc.vitamins.B7.unit).to.be.equal('g');
		expect(doc.vitamins.B9.unit).to.be.equal('g');
		expect(doc.vitamins.B12.unit).to.be.equal('g');
		expect(doc.vitamins.C.unit).to.be.equal('g');
		expect(doc.vitamins.D.unit).to.be.equal('g');
		expect(doc.vitamins.E.unit).to.be.equal('g');
		expect(doc.vitamins.K.unit).to.be.equal('g');
	});

	it('should delete an ingredient', async function () {
		let doc;
		try {
			doc = await Ingredient.deleteOne({ _id: ingredientId });
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc.deletedCount).to.be.equal(1);
	});
});
