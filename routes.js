// routes.js

module.exports = function (app, passport) {
	// Home page
	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	// Login page
	app.get('/login', function  (req, res) {
		res.render('login.ejs', { message : req.flash('loginMessage')});
	});

	// Sign up page
	app.get('/signup', function  (req, res) {
		res.render('signup.ejs', { message : req.flash('signupMessage')});
	});

	// Protected profile page
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// Log out
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	// is user logged in
	function isLoggedIn (req, res, next) {
		if(!req.isAuth()) {
			next('routes');
			res.redirect('/');
		}
	}
}