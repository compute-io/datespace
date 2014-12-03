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

	it( 'should return an array of `Date` objects', function test() {
		var start, stop, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5000;

		actual = datespace( start, stop );

		assert.isArray( actual );
		for ( var i = 0; i < actual.length; i++ ) {
			assert.ok( actual[i] instanceof Date );
		}
	});

	it( 'should supply a default length', function test() {
		var start, stop, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5000;

		actual = datespace( start, stop, { 'round': 'floor' });

		assert.ok( actual.length );
		assert.ok( actual[0] < actual[1] );
	});

	it( 'should output both incremental and decremental arrays', function test() {
		var start, stop, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5000;

		// Incremental:
		actual = datespace( start, stop, { 'round': 'floor' });

		assert.ok( actual[0] < actual[1] );

		// Decremental:
		actual = datespace( stop, start, { 'round': 'round' });

		assert.ok( actual[0] > actual[1] );
	});

	it( 'should create a linearly spaced array of dates', function test() {
		var start, stop, expected, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5000;

		actual = datespace( start, stop, 6 );

		for ( var i = 0; i < actual.length; i++ ) {
			actual[ i ] = actual[ i ].getTime();
		}

		expected = [
			1417503650973,
			1417503651973,
			1417503652973,
			1417503653973,
			1417503654973,
			1417503655973
		];

		assert.deepEqual( actual, expected );
	});

	it( 'should accept Unix timestamps', function test() {
		var start, stop, expected, actual;

		stop = '2014-12-02T07:00:55.973Z';
		stop = new Date( stop ).getTime();
		stop = Math.floor( stop / 1000 );
		start = stop - 5;

		actual = datespace( start, stop, 6 );

		for ( var i = 0; i < actual.length; i++ ) {
			actual[ i ] = actual[ i ].getTime();
		}

		expected = [
			1417503650000,
			1417503651000,
			1417503652000,
			1417503653000,
			1417503654000,
			1417503655000
		];

		assert.deepEqual( actual, expected );
	});

	it( 'should ceil date values', function test() {
		var start, stop, expected, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5;

		actual = datespace( start, stop, 11, {'round': 'ceil' } );

		for ( var i = 0; i < actual.length; i++ ) {
			actual[ i ] = actual[ i ].getTime();
		}

		expected = [
			1417503655968,
			1417503655969,
			1417503655969,
			1417503655970,
			1417503655970,
			1417503655971,
			1417503655971,
			1417503655972,
			1417503655972,
			1417503655973,
			1417503655973
		];

		assert.deepEqual( actual, expected );
	});

	it( 'should floor date values', function test() {
		var start, stop, expected, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5;

		actual = datespace( start, stop, 11, {'round': 'floor' } );

		for ( var i = 0; i < actual.length; i++ ) {
			actual[ i ] = actual[ i ].getTime();
		}

		expected = [
			1417503655968,
			1417503655968,
			1417503655969,
			1417503655969,
			1417503655970,
			1417503655970,
			1417503655971,
			1417503655971,
			1417503655972,
			1417503655972,
			1417503655973
		];

		assert.deepEqual( actual, expected );
	});

	it( 'should round date values', function test() {
		var start, stop, expected, actual;

		stop = '2014-12-02T07:00:55.973Z';
		start = new Date( stop ) - 5;

		actual = datespace( start, stop, 11, {'round': 'round' } );

		for ( var i = 0; i < actual.length; i++ ) {
			actual[ i ] = actual[ i ].getTime();
		}

		expected = [
			1417503655968,
			1417503655969,
			1417503655969,
			1417503655970,
			1417503655970,
			1417503655971,
			1417503655971,
			1417503655972,
			1417503655972,
			1417503655973,
			1417503655973
		];

		assert.deepEqual( actual, expected );
	});

});
