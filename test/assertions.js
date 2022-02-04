const chai = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

chai.use(function (_chai, utils) {

	_chai.Assertion.addMethod('properties', function (...args) {

		if ( 
			args &&
			args.length && 
			Object.prototype.toString.call(args[0]) === '[object Array]'
		) {
			args = args[0];	
		}

		const not = utils.flag(this, 'negate');
		let obj = utils.flag(this, 'object');

		if ( Object.prototype.toString.call(obj.toObject) === '[object Function]' ) {
			obj = obj.toObject();
		}

		const keys = Object.keys(obj);

		const hasProperties = args.every( (prop) => keys.includes(prop) );

		new chai.Assertion( hasProperties ).to.be[ not ? 'false' : 'true'];

	});


	utils.addProperty(chai.Assertion.prototype, 'objectid', function () {

		const obj = utils.flag(this, 'object');
		const not = utils.flag(this, 'negate');
		
		new chai.Assertion( obj instanceof ObjectId ).to.be[ not ? 'false' : 'true'];

	});

	utils.addProperty(chai.Assertion.prototype, 'array', function () {

		const obj = utils.flag(this, 'object');
		const not = utils.flag(this, 'negate');
		
		new chai.Assertion( Object.prototype.toString.call(obj) === '[object Array]' ).to.be[ not ? 'false' : 'true'];

	});

});
