var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');

router.param('ticket_id', function(req, res, next, id) {
	var query = Ticket.findById(id);

	query.populate('_createdBy')
		.populate('_assignedTo')
		.populate('_customer')
		.populate('comments')
		.exec(function(err, ticket) {
			if (err) 
				return next(err);
			if (!ticket)
				return next(new Error("Can't find ticket"));
			req.ticket = ticket;
			return next();
		});
	});


router.route('/')
	.get(function(req, res, next) {
		Ticket.find().populate('_createdBy').exec(function(err, bears) {
			if (err) {
				res.send(err);
			}
			res.json(bears);
		})
	})
	.post(function(req, res, next) {
		var newTicket = new Ticket(req.body);
		newTicket.save(function(err, ticket) {
			if (err) {
				res.send(err)
				console.log('Error: ' + err);
			}
			else {
				res.json(ticket);
			}
		})
	});

router.route('/:ticket_id')
	.put(function(req, res, next) {
		var ticket = req.ticket;
		var updatedData = req.body;

		var query = Ticket.update({_id : ticket._id}, updatedData );
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(ticket);
			}
		});
	})
	.get(function(req, res, next) {
		res.json(req.ticket);
	});

router.route('/:ticket_id/comment')
	.post(function(req, res, next) {
		var ticket = req.ticket;
		var comment = req.body;
		console.log("New comment for Ticket Id: " + ticket._id);
		console.log("Comment: [" + comment.description + "]");
		

		var query = Ticket.update({_id : ticket._id}, { $push: {comments: comment}});
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				console.log('Comment added successfully.');
				res.json(ticket);	
			}
			
		});
	});

module.exports = router;