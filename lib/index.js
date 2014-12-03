/**
*
*	COMPUTE: datespace
*
*
*	DESCRIPTION:
*		- Generates an array of linearly spaced dates.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isInteger = require( 'validate.io-integer' );


// VARIABLES //

var timestamp = /^\d{10}$|^\d{13}$/,
	rounders = [ 'floor', 'ceil', 'round' ];


// FUNCTIONS //

/**
* FUNCTION: validDate( value, name )
*	Validates a date parameter.
*
* @private
* @param {*} value - value to be validated
* @param {String} name - name to be used in error messages
* @returns {Date} validated date
*/
function validDate( value, name ) {
	var type;

	type = typeof value;
	if ( type === 'string' ) {
		value = Date.parse( value );
		if ( value !== value ) {
			throw new Error( 'datespace()::invalid input argument. Unable to parse ' +  name.toLowerCase() + ' date.' );
		}
		value = new Date( value );
	}
	if ( type === 'number' ) {
		if ( !timestamp.test( value ) ) {
			throw new Error( 'datespace()::invalid input argument. Numeric ' + name.toLowerCase() + ' date must be either a Unix or Javascript timestamp.' );
		}
		if ( value.toString().length === 10 ) {
			value = value * 1000; // sec to ms
		}
		value = new Date( value );
	}
	if ( !(value instanceof Date) ) {
		throw new TypeError( 'datespace()::invalid input argument. ' + name + ' date must either be a date string, Date object, Unix timestamp, or JavaScript timestamp.' );
	}
	return value;
} // end FUNCTION validDate()


// DATESPACE //

/**
* FUNCTION: datespace( start, stop[, length, options])
*	Generates an array of linearly spaced dates.
*
* @param {Date|Number|String} start - start time as either a `Date` object, Unix timestamp, JavaScript timestamp, or date string
* @param {Data|Number|String} stop - stop time as either a `Date` object, Unix timestamp, JavaScript timestamp, or date string
* @param {Number} [length] - output array length (default: 100)
* @param {Object} [options] - function options
* @param {String} [options.round] - specifies how sub-millisecond times should be rounded: [ 'floor', 'ceil', 'round' ] (default: 'floor' )
* @returns {Array} array of dates
*/
function datespace( start, stop, length, options ) {
	var nArgs = arguments.length,
		opts = {
			'round': 'floor'
		},
		len = 100,
		flg = true,
		round,
		end,
		d,
		tmp,
		arr;

	start = validDate( start, 'Start' );
	stop = validDate( stop, 'Stop' );

	if ( nArgs > 2 ) {
		if ( nArgs === 3 ) {
			if ( isObject( length ) ) {
				opts = length;
			} else {
				len = length;

				// Turn off checking the options object...
				flg = false;
			}
		} else {
			opts = options;
			len = length;
		}
		if ( len === 0 ) {
			return [];
		}
		if ( !isInteger( len ) || len < 0 ) {
			throw new TypeError( 'datespace()::invalid input argument. Length must a positive integer.' );
		}
		if ( flg ) {
			if ( !isObject( opts ) ) {
				throw new TypeError( 'datespace()::invalid input argument. Options must be an object.' );
			}
			if ( opts.hasOwnProperty( 'round' ) ) {
				if ( typeof opts.round !== 'string' ) {
					throw new TypeError( 'datespace()::invalid input argument. Round option must be a string.' );
				}
				if ( rounders.indexOf( opts.round ) === -1 ) {
					throw new Error( 'datespace()::invalid input argument. Unrecognized round option. Must be one of [' + rounders.join( ',' ) + '].' );
				}
			} else {
				opts.round = 'floor';
			}
		}
	}
	round = Math[ opts.round ];

	// Calculate the increment...
	end = len - 1;
	d = ( stop.getTime() - start.getTime() ) / end;

	// Build the output array...
	arr = new Array( len );
	tmp = start;
	arr[ 0 ] = tmp;
	tmp = tmp.getTime();
	for ( var i = 1; i < end; i++ ) {
		tmp += d;
		arr[ i ] = new Date( round( tmp ) );
	}
	arr[ end ] = stop;
	return arr;
} // end FUNCTION datespace()


// EXPORTS //

module.exports = datespace;
