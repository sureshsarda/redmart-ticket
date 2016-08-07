var util = require('util');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

/*
 * ROUTE END POINTS:
 *	GET 	user/				Get all users
 * 	POST 	user/ 				Create a new user 	 	
 *
 *	GET 	user/customer		Get all customers
 *	GET 	user/csr 			Get all CSRs
 *
 *	DELETE 	user/{id} 			Delete user by id
 *	GET 	user/{id}			Get user by id
 * 
 * 	GET 	/options/type		Get user types
 */

router.route('/options/type').get(function(req, res, next) {
	res.json(Ticket.schema.path('type').enumValues)
});

router.param('user_id', function(req, res, next, id) {
	var query = User.findById(id);

	query.exec(function(err, user) {
			if (err) 
				return next(err);
			if (!user)
				return next(new Error("Can't find ticket"));
			req.user = user;
			return next();
		});
	});

router.route('/')
	// GET all users
	.get(function(req, res, next) {
		User.find(function(err, bears) {
			if (err) {
				res.send(err);
			}
			res.json(bears);
		})
	})

	// CREATE a new user
	.post(function(req, res, next) {

		req.checkBody('name', 'param `name` is required').notEmpty();
		req.checkBody('email', 'param `email` is requred').notEmpty();

		var error = req.validationErrors();
		if (error) {
			res.status(400).send('Invalid Input: ' + util.inspect(error));
			return;
		}
		var user = new User(req.body);

		user.save(function(err, user) {
			if (err)
				res.send(err)
			res.json(user);
		})
	});

// GET all customers
router.route('/customers')
	.get(function(req, res) {
		var query = User.find({'type': {$eq : 'Customer'}});
		query.exec(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		})
	});

// GET all customer service representives
router.route('/csr')
	.get(function(req, res) {
		var query = User.find({'type': {$eq : 'CSR'}});
		query.exec(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		})
	});


router.route('/:user_id')
	
	// GET user details by ID
	.get(function(req, res, next) {
		res.json(req.user);
	}) 

	.put(function(req, res, next) {
		res.send("This feature has not been implemented yet");
	}) 

	.delete(function(req, res, next) {
		res.send("This feature has not been implemented yet");
	});	

module.exports = router;
