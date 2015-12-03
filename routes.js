// routes.js

module.exports = function (app, passport) {
	// Home page
	app.get('/', function (req, res) {
		res.render('index.ejs', {
			title: 'Lastword - say goodbye to the world'
		});
	});

	// Login page
	app.get('/login', function  (req, res) {
		res.render('login.ejs', { 
			title: 'Login to Lastword',
			message : req.flash('loginMessage')
		});
	});

	// Sign up page
	app.get('/signup', function  (req, res) {
		res.render('signup.ejs', { 
			title: 'Sign Up for Lastword',
			message : req.flash('signupMessage')
		});
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