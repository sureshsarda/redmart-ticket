var express = require('express');
var router = express.Router();

// - All API request ----------------------------------------------------------
var users = require('./users'),
	tickets = require('./tickets');

router.use('/api/users', users);
router.use('/api/tickets', tickets);

router.get('/api', function(req, res, next) {
	var links = { 
		
		list_users : {
			method: 'GET',
			url: '/api/users'
		},

		list_tickets : {
			method: 'GET',
			url: '/api/tickets'
		}
	}
	res.json(links);
});


// - Frontend for all requests ------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
