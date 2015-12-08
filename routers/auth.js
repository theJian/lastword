// routers/auth

var router = require('express').Router();

router.get('/', function (req, res) {
	res.send('auth');
});

router.get('/facebook', function (req, res) {
	res.send('auth/facebook');
});

module.exports = router;
