'use strict';

/**
* Module dependencies.
*/

const chai = require('chai');

chai.use(function (_chai, utils) {

	chai.Assertion.addMethod('properties', function (props=[]) {
		const obj = utils.flag(this, 'object');

		const keys = Object.keys(obj);
		const hasProperties = props.every( (prop) => keys.includes(prop) );

		new chai.Assertion( hasProperties ).to.be.true;
	});

});
