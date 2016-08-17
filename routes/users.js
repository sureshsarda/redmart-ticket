var util = require('util');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var User = mongoose.model('User');


var USER_LINKS = Object.freeze({
	'list_users': 		{ method: 'GET',	href: '/api/users' },
	'create': 			{ method: 'POST', 	href: '/api/users'},
	'list_customers': 	{ method: 'GET', 	href: '/api/customer'},
	'list_csr': 		{ method: 'GET', 	href: '/api/csr'},
	'retrieve': 		{ method: 'GET', 	href: '/api/users/:id'},
	'update': 			{ method: 'PUT', 	href: '/api/users/:id'},
	'delete': 			{ method: 'DELETE',	href: '/api/users/:id'},
	'user_types':  		{ method: 'GET', 	href: '/api/users/types'}
});


router.route('/type').get(function(req, res, next) {
	var body = {};
	body.types = User.schema.path('type').enumValues; 
	res.status(200).json(body);
});

router.param('user_id', function(req, res, next, id) {
	if (!ObjectId.isValid(id)) {
		res.status(400).json('Object Id is invalid');
	}
	var query = User.findById(id);
	query
		.exec(function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				return next();	
			}			
		});
	});


router.route('/')
	/**
	  * Get all the users
	  *
	  * PARAMETERS:
	  *			None
	  *
	  *	RETURNS:
	  *			users - a list of all users
	  *			links - @see USER_LINKS
	  */
	.get(function(req, res, next) {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
			}
			else {
				var body = {};
				body.users = users;
				body.links = USER_LINKS;
				
				res.status(200).json(body);
			}
		});
	})

	/**
	  * Create a new user
	  *
	  * PARAMETERS: 
	  *			name, email (proper email format)
	  *
	  * RETURNS:
	  *			user - the newly created user
	  * 		links - update, delete the newly created user
	  */
	.post(function(req, res, next) {
		//verify paramters
		req.checkBody('name', 'param name is required').notEmpty();
		req.checkBody('email', 'param email is requred').notEmpty().isEmail();

		var error = req.validationErrors();
		if (error) {
			res.status(400).json('Invalid Input: ' + util.inspect(error));
			return;
		}

		// param verification successful
		var user = new User(req.body);

		user.save(function(err, user) {
			if (err) {
				res.send(err)
			}
			else {
				var body = {}
				body.user = user;
				body.links = {
					update : updateUserLinkObject(user),
					delete : deleteUserLinkObject(user)
				}
				res.status(201).json(body);
			}
		})
	});

/**
  * Get all the customer. Customer are user with type = 'Customer'
  *
  * PARAMETERS:
  *			None
  *
  *	RETURNS:
  *			users - a list of all customers
  *			links - @see USER_LINKS
  */
router.route('/customers')
	.get(function(req, res) {
		var query = User.find({'type': {$eq : 'Customer'}});
		query.exec(function(err, users) {
			if (err) {
				res.send(err)
			}
			else {
				var body = {};
				body.users = users;
				body.links = USER_LINKS;
				
				res.status(200).json(body);	
			}
		})
	});

/**
  * Get all the CSRs. CSR are user with type = 'CSR'
  *
  * PARAMETERS:
  *			None
  *
  *	RETURNS:
  *			users - a list of all CSRs
  *			links - @see USER_LINKS
  */
router.route('/csrs')
	.get(function(req, res) {
		var query = User.find({'type': {$eq : 'CSR'}});
		query.exec(function(err, users) {
			if (err) {
				res.send(err)
			}
			else {
				var body = {};
				body.users = users;
				body.links = USER_LINKS;
				
				res.status(200).json(body);	
			}		
		})
	});


router.route('/:user_id')
	
	/**
	  * Retrieve a user based on user_id
	  *
	  * PARAMETERS:
	  *			None
	  *
	  * RETURNS:
	  *			user - the user retrieved
	  *			links - update and delete links on the user
	  */
	.get(function(req, res, next) {
		var body = {
			'user' : req.user,
			'links' : {
				'update' : updateUserLinkObject(req.user),
				'delete' : deleteUserLinkObject(req.user)	
			}
		}
		res.status(200).json(body);
	})

	/**
	  * Update a user based on user_id. The user id is fetched from the URL
	  * whereas the update user information should be passed as data
	  *
	  * PARAMETERS:
	  *			the updated user
	  *
	  * RETURNS:
	  *			user - the udpated user
	  *			links - delete link on the user
	  */
	.put(function(req, res, next) {
		res.status(304).send("This feature has not been implemented yet");
	}) 

	/**
	  * Delete a user based on user_id
	  *
	  * PARAMETERS:
	  *			None
	  *
	  * RETURNS:
	  *			user - deleted user
	  *			links - links to create a new user and list all users
	  */
	.delete(function(req, res, next) {
		var user = req.user;
		var query = User.remove({_id : user._id});

		query.exec(function(err, user) {
			if (err) {
				res.send(err);
			}
			else {
				var body = {
					user : req.user,
					links : {
						'update' : USER_LINKS['create'],
						'delete' : USER_LINKS['list_users']
					}
				}
				res.status(200).json(body);	
			}
		});
	});	

module.exports = router;

function deleteUserLinkObject(user) {
	return {
		'href'		: "/api/users/" + user._id,
		'method' 	: "DELETE"
	}
}

function updateUserLinkObject(user) {
	return {
		'href' 		: "/api/users/" + user._id,
		'method'	: "PUT"
	}
}



