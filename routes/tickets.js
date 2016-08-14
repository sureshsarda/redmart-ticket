var util = require('util');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');


var TICKET_LINKS = {
	'list_tickets':		{ method: 'GET',	href: '/api/tickets' },
	'create':			{ method: 'POST',	href: '/api/tickets' },
	'list_area':		{ method: 'GET',	href: '/api/tickets/options/area' },
	'list_status':		{ method: 'GET',	href: '/api/tickets/options/status' },
	'retrieve':			{ method: 'GET',	href: '/api/tickets/:ticket_id' },
	'update':			{ method: 'PUT',	href: '/api/tickets/:ticket_id' },
	'delete':			{ method: 'DELETE',	href: '/api/tickets/:ticket_id' }
}

router.route('/options/area').get(function(req, res, next) {
	var body = {
		'area' : Ticket.schema.path('area').enumValues
	};
	res.status(200).json(body);
});

router.route('/options/status').get(function(req, res, next) {
	var body = {
		'status' : Ticket.schema.path('status').enumValues
	}
	res.status(200).json(body);
});

router.param('ticket_id', function(req, res, next, id) {
	var query = Ticket.findById(id);

	query
		.populate(['_createdBy', '_assignedTo', '_customer'])
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
	/**
	  * Returns list of all tickets. Can be filtered usign query parameters
	  *
	  * PARAMETERS:
	  *				status, customer(ObjectId), assignedTo(ObjectId), area
	  *				parameters are case sensitative
	  *
	  * RETURNS:
	  *				tickets, links (@see TICKET_LINKS)
	  */
	.get(function(req, res, next) {
		var status = req.query.status;
		var customer = req.query.customer;
		var assignedTo = req.query.assignedTo;
		var area = req.query.area;

		var filter = {};
		if (status) {
			filter.status = status
		}

		if (customer) {
			filter._customer = customer;
		}

		if (assignedTo) {
			filter._assignedTo = assignedTo;
		}

		if (area) {
			filter.area = area;
		}

		Ticket.find(filter)
			.populate(['_assignedTo', '_customer'])
			.exec(function(err, tickets) {
				if (err) {
					res.send(err);
				}
				else {
					var body = {
						'tickets' 	: tickets,
						'links'		: TICKET_LINKS
					}
					res.status(200).json(body);
				}
			})
	})
	/**
	  * Creates a new ticket from body params
	  *
	  * PARAMETERS:
	  *				required: _customer, _createdBy, description
	  *				optional: other fields of Ticket schema
	  *
	  * RETURNS:
	  *				ticket, links (update, delete, comment)
	  */
	.post(function(req, res, next) {

		req.checkBody('_customer', 'param _customer is required').notEmpty();
		req.checkBody('_createdBy', 'param _createdBy is requred').notEmpty();
		req.checkBody('description', 'param description is requred').notEmpty();

		var error = req.validationErrors();
		if (error) {
			res.status(400).json('Invalid Input: ' + util.inspect(error));
			return;
		}

		var newTicket = new Ticket(req.body);
		newTicket.save(function(err, ticket) {
			if (err) {
				res.status(400).send(err)
			}
			else {
				var body {
					'ticket' : tickets,
					'links'	 : {
						'update' : updateTicketLinkObject(tickets),
						'delete' : deleteTicketLinkObject(tickets),
						'comment' : commentTicketLinkObject(tickets),
					}
				}
				res.status(201).json(body);
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

function deleteTicketLinkObject(tickets) {
	return {
		'href'		: "/api/tickets/" + tickets._id,
		'method' 	: "DELETE"
	}
}

function updateTicketLinkObject(tickets) {
	return {
		'href' 		: "/api/tickets/" + tickets._id,
		'method'	: "PUT"
	}
}

function commentTicketLinkObject(tickets) {
	return {
		'href'		: "/api/tickets/" + tickets._id + '/comment',
		'method'	: "POST"
	}
}