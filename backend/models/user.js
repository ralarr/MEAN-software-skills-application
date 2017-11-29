const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

var nameValidator = [
	validate({
		validator: 'matches',
		arguments: /^([a-zA-Z]{3,20})+$/,
		message: 'Name must be at least 3 characters, max 20'
	}),
	validate({
		validator: 'isLength',
		arguments: [3, 20],
		message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
	})
];

var emailValidator = [
	validate({
		validator: 'isEmail',
		message: 'Enter a valid email'
	}),
	validate({
		validator: 'isLength',
		arguments: [3, 30],
		message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
	})
];

var usernameValidator = [
	validate({
		validator: 'isLength',
		arguments: [3, 30],
		message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
	}),
	validate({
		validator: 'isAlphanumeric',
		message: 'Username must contain letters and numbers only'
	})
];

var passwordValidator = [
	validate({
		validator: 'matches',
		arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,30}$/,
		message: 'Password must have at least one lower case, one uppercase, one number, one special character, and must be at least 8 character and no more than 30'
	}),
	validate({
		validator: 'isLength',
		arguments: [8, 30],
		message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
	})
]

var UserSchema = new Schema({
	name: { type: String, required: true, validate: nameValidator },
	username: { type: String, lowercase: true, required: true, unique: true, validate: usernameValidator },
	password: { type: String, required: true, validate: passwordValidator },
	email: { type: String, lowercase: true, required: true, unique: true, validate: emailValidator }
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) return next(err);

		user.password = hash;
		next();
	});
});

UserSchema.plugin(titlize, {
	paths: ['name']
});

UserSchema.methods.comparePassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
