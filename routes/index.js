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
