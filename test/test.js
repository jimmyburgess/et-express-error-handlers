/* global before, after, describe, it */
'use strict';

var express = require('express');
var origFn = express.session.Session.prototype.save;

var should				= require( 'chai' ).should();
var expect				= require( 'chai' ).expect;
var errorHandlers = require('../lib/error-handlers');


describe( 'token middleware', function() {


	it( 'should exist', function( done ) {
		should.exist( errorHandlers );
		done();
	});

});