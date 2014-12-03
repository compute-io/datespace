datespace
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Generates an array of linearly spaced [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).


## Installation

``` bash
$ npm install compute-datespace
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var datespace = require( 'compute-datespace' );
```

#### datespace( start, stop[, length, opts] )

Generates an `array` of linearly spaced [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects. If a `length` is not provided, the default output `array` length is `100`.

``` javascript
var stop = '2014-12-02T07:00:54.973Z',
	start = new Date( stop ) - 60000;

var arr = datespace( start, stop, 6 );
/* returns [
	'Mon Dec 01 2014 22:59:54 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:06 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:18 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:30 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:42 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:54 GMT-0800 (PST)'
]
*/
```

The `start` and `stop` times may be either [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects, date strings, Unix timestamps, or JavaScript timestamps.

``` javascript
var start, stop, arr;

// JavaScript timestamps:
stop = 1417503654973;
start = new Date( stop - 60000 );

arr = datespace( start, stop, 6 );
/* returns [
	'Mon Dec 01 2014 22:59:54 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:06 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:18 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:30 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:42 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:54 GMT-0800 (PST)'
]
*/

// Unix timestamps:
stop = 1417503655;
start = stop - 60;

arr = datespace( start, stop, 6 );
/* returns [
	'Mon Dec 01 2014 22:59:54 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:06 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:18 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:30 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:42 GMT-0800 (PST)',
	'Mon Dec 01 2014 23:00:54 GMT-0800 (PST)'
]
*/
```

The output `array` is guaranteed to include the `start` and `end` times. Beware, however, that values between the `start` and `end` are subject to rounding errors. For example,

``` javascript
var arr = datespace( 1417503655000, 1417503655001, 3 );
// returns [ 1417503655000, 1417503655000, 1417503655001 ]
```

where sub-millisecond values are truncated by the [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) constructor. Duplicate values should only be a problem when the interval separating consecutive times is less than a millisecond. As the interval separating consecutive dates goes to infinity, the quantization noise introduced by millisecond resolution is negligible.

By default, fractional timestamps are floored. To specify that timestamps always be rounded up or to the nearest millisecond __when converted to [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects__, set the `round` option (default: `floor`).

``` javascript
// Equivalent of Math.ceil():
var arr = datespace( 1417503655000, 1417503655001, 3, { 'round': 'ceil' } );
// returns [ 1417503655000, 1417503655001, 1417503655001 ]

// Equivalent of Math.round():
var arr = datespace( 1417503655000, 1417503655001, 3, { 'round': 'round' } );
// returns [ 1417503655000, 1417503655001, 1417503655001 ]
```



## Notes

This function is similar to [compute-linspace](https://github.com/compute-io/linspace).



## Examples

``` javascript
var datespace = require( 'compute-datespace' ),
	start,
	stop,
	arr;

stop = '2014-12-02T07:00:54.973Z';
start = new Date( stop ) - 100000;

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-datespace.svg
[npm-url]: https://npmjs.org/package/compute-datespace

[travis-image]: http://img.shields.io/travis/compute-io/datespace/master.svg
[travis-url]: https://travis-ci.org/compute-io/datespace

[coveralls-image]: https://img.shields.io/coveralls/compute-io/datespace/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/datespace?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/datespace.svg
[dependencies-url]: https://david-dm.org/compute-io/datespace

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/datespace.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/datespace

[github-issues-image]: http://img.shields.io/github/issues/compute-io/datespace.svg
[github-issues-url]: https://github.com/compute-io/datespace/issues
