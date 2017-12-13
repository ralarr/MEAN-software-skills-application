var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'computadora';

module.exports = function(router){
	router.post('/users', function(req, res){
		var user = new User();
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if (req.body.name == null || req.body.name == '' || req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
			res.json({ success: false, message: 'Enter name, username, password, and email'});
		} else {
			user.save(function(err){
				if (err){
					if (err.errors != null){
						if(err.errors.name){
							res.json({ success: false, message: err.errors.name.message });
						} else if (err.errors.email){
							res.json({ success: false, message: err.errors.email.message });
						} else if (err.errors.username){
							res.json({ success: false, message: err.errors.username.message });
						} else if (err.errors.password){
							res.json({ success: false, message: err.errors.password.message });
						} else {
							res.json({ success: false, message: err });
						}
					} else if (err){
						if (err.code == 11000){
							res.json({ success: false, message: 'Username or email already exists' });
						} else {
							res.json({ success: false, message: err });
						}
					}
				} else {
					res.json({ success: true, message: 'user created' });
				}
			});
		}
	});

	router.post('/authenticate', function(req, res){
		User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user){
			if (err) throw err;

			if (!user){
				res.json({ success: false, message: 'Could not authenticate user' });
			} else if (user){
				if (req.body.password){
					var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({ success: false, message: 'No password provided' });
				}
				if (!validPassword){
					res.json({ success: false, message: 'Could nooooot authenticate password' });
				} else {
					var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '12h'} );
					res.json({ success: true, message: 'User Authenticated', token: token });
				}
			}
		});
	});

	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if (token){
			jwt.verify(token, secret, function(err, decoded){
				if (err){
					res.json({ success: false, message: 'Invalid Token' });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'No token was provided' });
		}
	});

	router.post('/me', function(req, res){
		res.send(req.decoded);
	});

	return router;
}
