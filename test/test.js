/* globals describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	datespace = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-datespace', function tests() {

	it( 'should export a function', function test() {
		expect( datespace ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a valid start date', function test() {
		var stop, values;

		stop = new Date();

		values = [
			'beep',
			5,
			-5,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				datespace( value, stop );
			};
		}
	});

	it( 'should throw an error if not provided a valid stop date', function test() {
		var start, values;

		start = new Date().getTime();

		values = [
			'beep',
			5,
			-5,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				datespace( start, value );
			};
		}
	});

	it( 'should throw an error if provided an invalid length', function test() {
		var start, stop, values;

		start = new Date().getTime();
		stop = new Date();

		values = [
			'beep',
			3.14,
			-5,
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( Error );
			expect( badValue2( values[i] ) ).to.throw( Error );
		}

		function badValue1( value ) {
			return function() {
				datespace( start, stop, value );
			};
		}
		function badValue2( value ) {
			return function() {
				datespace( start, stop, value, {} );
			};
		}
	});

	it( 'should throw an error if provided a non-object for options', function test() {
		var start, stop, values;

		start = new Date().getTime();
		stop = new Date();

		values = [
			'beep',
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				datespace( start, stop, 10, value );
			};
		}
	});

	it( 'should throw an error if provided an invalid round option', function test() {
		var start, stop, values;

		start = new Date().getTime();
		stop = new Date();

		values = [
			'beep',
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				datespace( start, stop, 10, { 'round': value });
			};
		}
	});

	it( 'should ignore unrecognized options', function test() {
		var start, stop, values;

		start = new Date().getTime();
		stop = new Date();

		values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( okValue( values[i] ) ).to.not.throw( Error );
		}

		function okValue( value ) {
			var opts = {};
			opts[ value ] = 'floor';
			return function() {
				datespace( start, stop, 10, opts );
			};
		}
	});

	it( 'should return an empty array if provided a length of 0', function test() {
		var start = new Date().getTime(),
			stop = new Date(),
			actual;

		actual = datespace( start, stop, 0 );

		assert.deepEqual( actual, [] );
	});

});
