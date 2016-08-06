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
		ticket._createdBy = req.body.createdBy_id;
		ticket.description = req.body.description;

		ticket.save(function(err, ticket) {
			if (err)
				res.send(err)
			res.json(ticket);
		})
	});

module.exports = router;