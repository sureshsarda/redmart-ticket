var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');

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
		var ticket = new Ticket();
		console.log(req.body);
		ticket._createdBy = req.body._createdBy;
		ticket._customer = req.body._customer;
		ticket._assignedTo = req.body._assignedTo;
		ticket.description = req.body.description;

		
		ticket.save(function(err, ticket) {
			if (err) {
				res.send(err)
				console.log('Error: ' + err);
			}
			else {
				res.json(ticket);
			}
		})
	});

router.param('ticket_id', function(req, res, next, id) {
	var query = Ticket.findById(id);

	query.populate('_createdBy')
		.populate('_assignedTo')
		.populate('_customer')
		.exec(function(err, ticket) {
		if (err) 
			return next(err);
		if (!ticket)
			return next(new Error("Can't find ticket"));
		req.ticket = ticket;
		return next();
	});
});


router.route('/:ticket_id').get(function(req, res, next) {
	res.json(req.ticket);
});

router.route('/:ticket_id/comment').post(function(req, res, next) {
	
});

module.exports = router;