var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');


// var User = require("../models/User");
// var Ticket = require("../models/Ticket");
// var Comment = require("./models/Comment");

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

module.exports = router;