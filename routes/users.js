var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');


// var User = require("../models/User");

/* GET users listing. */
router.route('/')
	.get(function(req, res, next) {
		User.find(function(err, bears) {
			if (err) {
				res.send(err);
			}
			res.json(bears);
		})
	})
	.post(function(req, res, next) {
		var user = new User();
		user.name = req.body.name;
		user.email = req.body.email;

		user.save(function(err, user) {
			if (err)
				res.send(err)
			res.json(user);
		})
	});

router.route('/:user_id')
	
	.get(function(req, res, next) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	}) 

	.put(function(req, res, next) {
		res.send("This feature has not been implemented yet");
	}) 

	.delete(function(req, res, next) {
		res.send("This feature has not been implemented yet");
	});

router.route('/deleteAllUsers/yes')
	.delete(function(req, res, next) {
		Users.remove({});
	});
	

module.exports = router;
