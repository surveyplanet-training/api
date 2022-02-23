const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-iso8601')());
const { mongo } = require('../../../lib/config');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const User = require('../../../lib/models/user');

describe('User Unit Test', function () {
	before(() => mongoose.connect(mongo));
	after(() => mongoose.disconnect());

	let userId;

	const date = new Date(1999, 2, 24);
	const options = {
		userId: new ObjectId(),
		name: {
			first: 'Thomas',
			last: 'Anderson',
		},
		email: 'neo@matrix.org',
		phone: '123123213',
		photo: 'photo',
		loggedIn: date,
		verified: {
			hash: 'legendaryHash',
			expires: date,
			date: date,
		},
		password: 'immaguessthisisntsupposedtobeplaintext',
		passReset: {
			hash: 'sadasdasdasd',
			expires: date,
		},
		ip: '198.1.0.108',
		notes: 'a game dev',
		preferences: {
			currency: 'USD',
		},
	};

	it('should create a user', async function () {
		const user = new User(options);

		let doc;

		try {
			doc = await user.save();
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		userId = doc._id;
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc.name.first).to.be.equal(options.name.first);
		expect(doc.name.last).to.be.equal(options.name.last);
		expect(doc.email).to.be.equal(options.email);
		expect(doc.phone).to.be.equal(options.phone);
		expect(doc.photo).to.be.equal(options.photo);
		expect(doc.created.toISOString()).to.be.iso8601('eq', new Date().toISOString(), 11000);
		expect(doc.updated.toISOString()).to.be.iso8601('eq', new Date().toISOString(), 11000);
		expect(doc.loggedIn.toString()).to.be.equal(options.loggedIn.toString());
		expect(doc.verified.hash).to.be.equal(options.verified.hash);
		expect(doc.verified.expires.toString()).to.be.equal(options.verified.expires.toString());
		expect(doc.verified.date.toString()).to.be.equal(options.verified.date.toString());
		expect(doc.password).to.be.equal(options.password);
		expect(doc.passReset.hash).to.be.equal(options.passReset.hash);
		expect(doc.passReset.expires.toString()).to.be.equal(options.passReset.expires.toString());
		expect(doc.ip).to.be.equal(options.ip);
		expect(doc.notes).to.be.equal(options.notes);
		expect(doc.preferences.currency).to.be.equal(options.preferences.currency);
	});

	it('should update a user', async function () {
		const filter = { _id: userId };
		const update = {
			notes: 'the chosen one',
			'name.first': 'Neo',
		};

		let doc;
		try {
			doc = await User.updateOne(filter, update);
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

	it('should get a user', async function () {
		let doc;

		try {
			doc = await User.findOne({ _id: userId });
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		userId = doc._id;
		expect(doc).to.have.property('_id');
		expect(doc._id).to.be.instanceOf(ObjectId);
		expect(doc.name.first).to.be.equal('Neo');
		expect(doc.name.last).to.be.equal(options.name.last);
		expect(doc.email).to.be.equal(options.email);
		expect(doc.phone).to.be.equal(options.phone);
		expect(doc.photo).to.be.equal(options.photo);
		expect(doc.created.toISOString()).to.be.iso8601('eq', new Date().toISOString(), 11000);
		expect(doc.updated.toISOString()).to.be.iso8601('eq', new Date().toISOString(), 11000);
		expect(doc.loggedIn.toString()).to.be.equal(options.loggedIn.toString());
		expect(doc.verified.hash).to.be.equal(options.verified.hash);
		expect(doc.verified.expires.toString()).to.be.equal(options.verified.expires.toString());
		expect(doc.verified.date.toString()).to.be.equal(options.verified.date.toString());
		expect(doc.password).to.be.equal(options.password);
		expect(doc.passReset.hash).to.be.equal(options.passReset.hash);
		expect(doc.passReset.expires.toString()).to.be.equal(options.passReset.expires.toString());
		expect(doc.ip).to.be.equal(options.ip);
		expect(doc.notes).to.be.equal('the chosen one');
		expect(doc.preferences.currency).to.be.equal(options.preferences.currency);
	});

	it('should delete a user', async function () {
		let doc;
		try {
			doc = await User.deleteOne({ _id: userId });
		} catch (error) {
			expect(error).to.not.exist;
		}

		expect(doc).to.exist;
		expect(doc.deletedCount).to.be.equal(1);
	});
});
