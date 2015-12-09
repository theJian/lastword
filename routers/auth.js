// routers/auth

var router = require('express').Router();

module.exports = function (passport) {

	router.get('/facebook', passport.authenticate('facebook'));

	// TODO: this shit doesn't work
	router.get('/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash: true
	}));

	router.get('/twitter', passport.authenticate('twitter'));

	router.get('/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash: true
	}));

	return router;
}
