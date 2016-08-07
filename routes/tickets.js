var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');

router.route('/options/area').get(function(req, res, next) {
	res.json(Ticket.schema.path('area').enumValues)
});

router.route('/options/status').get(function(req, res, next) {
	res.send(Ticket.schema.path('status').enumValues)
});

router.param('ticket_id', function(req, res, next, id) {
	var query = Ticket.findById(id);

	query.populate(['_createdBy', '_assignedTo', '_customer'])
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
		Ticket.find()
			.populate(['_createdBy', '_assignedTo', '_customer', 'comments'])
			.exec(function(err, bears) {
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
		var ticket = req.ticket.toObject();
		var updatedData = new Ticket(req.body);

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
	.delete(function(req, res, next) {
		var ticket = req.ticket;
		var query = Ticket.remove({_id : ticket._id});
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(ticket);	
				console.log(ticket);
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
		comment.dateCreated = Date.now();

		var query = Ticket.update({_id : ticket._id}, { $push: {comments: comment}});
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(ticket);	
			}
			
		});
	});



module.exports = router;