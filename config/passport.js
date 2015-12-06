// passport.js
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js'); // import user model

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
		console.log('******************************');
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
}