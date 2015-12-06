// requireds
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


// user schema
var userSchema = new Schema({
	local: {
		email		: String,
		password	: String,
	},
	facebook: {
		id			: String,
		token		: String,
		email		: String,
		name		: String
	},
	twitter: {
		id			: String,
		token		: String,
		displayName	: String,
		username 	: String
	},
	google: {
		id			: String,
		token		: String,
		email		: String,
		name 		: String
	}
});

// methods defination
// HASH generator
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// check if password is valid
userSchema.methods.isValidPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);