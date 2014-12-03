'use strict';

var datespace = require( './../lib' ),
	start,
	stop,
	arr;

stop = '2014-12-02T07:00:54.973Z';
start = new Date( stop ) - 100000;

// Default behavior:
console.log( '\nDefault:' );
arr = datespace( start, stop );
console.log( arr.join( '\n' ) );

// Specify length:
console.log( '\nLength 10:' );
arr = datespace( start, stop, 10 );
console.log( arr.join( '\n' ) );

console.log( '\nLength 11:' );
arr = datespace( start, stop, 11 );
console.log( arr.join( '\n' ) );

// Create an array with decremented values:
console.log( '\nDecremented values:' );
arr = datespace( stop, start, 11 );
console.log( arr.join( '\n' ) );

var stop = '2014-12-02T07:00:54.973Z',
	start = new Date( stop ) - 60000;

var arr = datespace( start, stop, 6 );
console.log( arr );
