'use strict';

var datespace = require( './../lib' ),
	start,
	stop,
	arr;

start = '2014-12-02T07:00:54.973Z';
stop = new Date( start ) - 100000;

// Default behavior:
arr = datespace( start, stop );
console.log( arr.join( '\n' ) );

// Specify length:
arr = datespace( start, stop, 10 );
console.log( arr.join( '\n' ) );

arr = datespace( start, stop, 11 );
console.log( arr.join( '\n' ) );

// Create an array with decremented values:
arr = datespace( stop, start, 11 );
console.log( arr.join( '\n' ) );
