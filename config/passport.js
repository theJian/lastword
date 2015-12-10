// passport.js
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var User = require('../models/user.js'); // import user model
var auth = require('./auth.js'); // import auth configuration

module.exports = function (passport) {
	
	passport.serializeUser(function  (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'Email',
		passwordField: 'Password',
		passReqToCallback: true
	}, function (req, email, password, done) {
		
		process.nextTick(function () {
			User.findOne({'local.email' : email }, function (err, user) {
				if(err) return done(err);

				// if user exists
				if(user) {
					return done(null, false, req.flash('signupMessage', 'Email is already taken'));
				} else {
					//user doesn't exist, create a new user
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));

	// local login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'Email',
		passwordField: 'Password',
		passReqToCallback: true
	}, function (req, email, password, done) {
		User.findOne({'local.email' : email }, function (err, user) {
			if(err) return done(err);

			// user doesn't exist
			if(!user) {
				return done(null, false, req.flash('loginMessage', 'Wrong email or password'));
			}

			// wrong password
			if(!user.isValidPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Wrong email or password'));
			}

			// success login
			return done(null, user);
		});
	}));

	// facebook auth
	passport.use(new FacebookStrategy({
		clientID: auth.facebookAuth.clientID,
		clientSecret: auth.facebookAuth.clientSecret,
		callbackURL: auth.facebookAuth.callbackURL,
		enableProof: auth.facebookAuth.enableProof
	}, function (accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			console.log('**************************\n' + accessToken);
			User.findOne({ 'facebook.id' : profile.id }, function  (err, user) {
				if(err) return done(err);

				// user donesn't exist, create a new user
				if(!user) {
					var newUser = new User();
					newUser.facebook.id = profile.id;
					newUser.facebook.token = accessToken;
					newUser.facebook.email = profile.email[0].value;
					newUser.facebook.name = profile.displayName;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
				} else { // user exists
					return done(null, user);
				}
			});
		});
	}));

	// twitter auth
	passport.use(new TwitterStrategy({
		consumerKey: auth.twitterAuth.consumerKey,
		consumerSecret: auth.twitterAuth.consumerSecret,
		callbackURL: auth.twitterAuth.callbackURL
	}, function (token, tokenSecret, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'twitter.id' : profile.id }, function (err, user) {
				if(err) return done(err);

				// user donesn't exist, create a new user
				if(!user) {
					var newUser = new User();
					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.displayName = profile.displayName;
					newUser.twitter.username = profile.username;

					newUser.save(function (err) {
						if(err) {
							throw err;
						}
						return done(null, newUser);
					});
				} else {
					return done(null, user);
				}
			});
		});
	}));
}