'use strict';

module.exports = function( server ) {

	// 401 handling
	server.use( function( err, req, res, next ) {
		// remove this for all errors
		res.removeHeader( 'x-frame-options' );

		console.log( '401 error handler' );

		if ( err.http_code === 401 ) {
			res.redirect( '/logout' );
			return;
		}

		next( err );
	});

	// 404 Error Handling
	server.use( function( req, res ) { // removed next from parameters because we don't want it to continue and it was never used
		res.status( 404 );

		// respond with html page
		if( req.accepts( 'html' ) ) {
			res.render( '404', {
				layout: 'errors',
				errorCode: 404,
				errorMsg: 'Not Found',
				url: req.url
			});
			return;
		}

		// respond with json
		if( req.accepts( 'json' ) ) {
			res.send( { error: '404: Not found' } );
			return;
		}

		// default to plain-text. send()
		res.type( 'txt' ).send( '404: Not found' );
	});

	// 500 Error Handling
	server.use( function( err, req, res ) {
		var errorCode = err.status || 500;
		res.status( errorCode );
		res.render( '500', {
			layout: 'errors',
			errorCode: errorCode,
			errorMsg: 'Server Error'
		});
	});
};