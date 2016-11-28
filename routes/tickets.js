/*
 * Copyright (C) 2016 Suresh Sarda
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 3, or (at your option) any
 * later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; see the file COPYING3.  If not see
 * <http://www.gnu.org/licenses/>.
 */
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
				var body = {
					'ticket' : ticket,
					'links'	 : {
						'update' : updateTicketLinkObject(ticket),
						'delete' : deleteTicketLinkObject(ticket),
						'comment' : commentTicketLinkObject(ticket)
					}
				}
				res.status(201).json(body);
			}
		})
	});

router.route('/:ticket_id')
	/**
	  * Updates a ticket based on it's id
	  *
	  * PARAMETERS:
	  *				ticket id in the url
	  *				updated ticket object in the body
	  *
	  * RETURNS:
	  *				ticket (the updated ticket object)
	  *				links (delete, comment)
	  */	
	.put(function(req, res, next) {
		var ticket = req.ticket.toObject();
		var updatedticket = new Ticket(req.body);

		var query = Ticket.update({_id : ticket._id}, updatedticket );
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				var body = {
					'ticket' : ticket,
					'links'  : {
						'delete' : deleteTicketLinkObject(ticket),
						'comment': commentTicketLinkObject(ticket)  
					}
				}
				res.status(200).json(body);
			}
		});
	})

	/**
	  * Deletes a ticket based on it's id
	  *
	  * PARAMETERS:
	  *				ticket id for ticket to delete
	  *
	  *	RETURNS:
	  *				the deleted ticket object
	  * 			links (create, list all)
	  */
	.delete(function(req, res, next) {
		var ticket = req.ticket;
		var query = Ticket.remove({_id : ticket._id});
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				var body = {
					'ticket' : ticket,
					'link'	 : {
						'create' 		: TICKET_LINKS['create'],
						'list_tickets' 	: TICKET_LINKS['list_tickets']
					}
				}
				res.status(200).json(body);
			}
		});
		
	})

	/**
	  * Retrieves a ticket based on it's id
	  *
	  * PARAMETERS:
	  *				ticket id
	  *
	  * RETURNS:
	  *				ticket - the ticket id
	  *				links - links to delete, update, comment
	  */
	.get(function(req, res, next) {
		var body = {
			'ticket'	: req.ticket,
			'link'		: {
				'update' : updateTicketLinkObject(req.ticket),
				'delete' : deleteTicketLinkObject(req.ticket),
				'comment' : commentTicketLinkObject(req.ticket)
			}
		}
		res.status(200).json(body);
	});

router.route('/:ticket_id/comment')
	/**
	  * Add a comment to given ticket
	  *
	  * PARAMETER:
	  *			ticket id in the url and comment body in message body
	  *
	  * RETURN:
	  *			ticket - the ticket object
	  *			links - to delete, modify the ticket
	  */
	.post(function(req, res, next) {
		var ticket = req.ticket;

		req.checkBody('description', 'param description is required').notEmpty();

		var error = req.validationErrors();
		if (error) {
			res.status(400).json('Invalid Input: ' + util.inspect(error));
			return;
		}

		var comment = req.body;
		comment.dateCreated = Date.now();

		var query = Ticket.update({_id : ticket._id}, { $push: {comments: comment}});
		query.exec(function(err, ticket) {
			if (err) {
				res.send(err);
			}
			else {
				var body = {
					'ticket' : ticket,
					'link' 	 : {
						'update' : updateTicketLinkObject(ticket),
						'delete' : deleteTicketLinkObject(ticket),
					}
				}
				res.status(200).json(body);
			}
		});
	});


module.exports = router;

/*
 * Helper methods to get the link object that needs to be sent with a response
 * The URL for these objects contains the id of the ticket object.
 * These methods create a object from the ticket and return it.
 */
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