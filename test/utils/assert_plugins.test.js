const { expect } = require('chai');
const { ObjectId } = require('mongoose').Types;

describe('Utils', function () {


	it('should have properties', async function () {

		// can pass array or multiple arguments
		expect({a:1,b:2}).to.have.properties('a','b');
		expect({a:1,b:2,c:3}).to.have.properties('a','b');
		expect({a:1,b:2}).to.not.have.properties('c', 'd');

		expect({a:1,b:2}).to.have.properties(['a','b']);
		expect({a:1,b:2,c:3}).to.have.properties(['a','b']);
		expect({a:1,b:2}).to.not.have.properties(['c', 'd']);

	});

	it('should be an ObjectId', async function () {

		expect( new ObjectId() ).to.be.objectid;
		expect( new ObjectId().toString() ).to.not.be.objectid;
		expect( {} ).to.not.be.objectid;
		expect( 123 ).to.not.be.objectid;

	});

	it('should be an Array', async function () {

		expect( [] ).to.be.array;
		expect( [1,2,3] ).to.be.array;
		expect( [{foo:'bar'}] ).to.be.array;
		expect( 'array' ).to.not.be.array;
		expect( {} ).to.not.be.array;
		expect( 123 ).to.not.be.array;

	});

	
});
