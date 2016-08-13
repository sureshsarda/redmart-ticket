var express = require('express');
var router = express.Router();

// - All API request ----------------------------------------------------------
var users = require('./users'),
	tickets = require('./tickets');

router.use('/users', users);
router.use('/tickets', tickets);

router.use('/api', router);


// - Frontend for all requests ------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
