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
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');

var userData = require('./data/users.js');
var ticketData = require('./data/tickets.js');

chai.use(chaiHttp);

describe('TicketsMetaData', function() {
	it ('GET /api/tickets/options/area : Should return correct area information', function(done) {
		chai.request(server)
		.get('/api/tickets/options/area')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.area.should.be.a('array');
			expect(res.body.area).to.have.lengthOf(4);
			res.body.area[0].should.be.equal('Technical');
			res.body.area[1].should.be.equal('Payment Related');
			res.body.area[2].should.be.equal('Delivery Issue');
			res.body.area[3].should.be.equal('Misc');
			done();
		})
	})

	it ('GET /api/tickets/options/status : Should return correct area information', function(done) {
		chai.request(server)
		.get('/api/tickets/options/status')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.status.should.be.a('array');
			expect(res.body.status).to.have.lengthOf(3);
			res.body.status[0].should.be.equal('New');
			res.body.status[1].should.be.equal('Open');
			res.body.status[2].should.be.equal('Closed');
			done();
		})
	})
});

describe('Tickets', function() {

	Ticket.collection.drop();

	beforeEach(function(done) {
		Ticket.collection.insert(ticketData.TICKETS_LIST, function(err) {
			if (err)
				console.log(err);
			done();
		})
	})

	afterEach(function(done) {
		Ticket.collection.drop();
		done();
	})

	it('GET /api/tickets/ : should get list of all tickets', function(done) {
		chai.request(server)
		.get('/api/tickets')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.tickets.should.be.a('array');
			// res.body.tickets[0].description.should.equal('A test ticket');
			done();
		})
	})
});
// describe('Tickets', function() {

// 	User.collection.drop();
// 	Ticket.collection.drop();

// 	beforeEach(function(done) {
// 		var userList = [
// 			{"name" : "Kalanithi Maran","email" : "Kalanithi@gmail.com", "type" : "CSR" },
// 			{"name" : "Kavery Kalanithi","email" : "Kavery@gmail.com", "type" : "CSR" },
// 			{"name" : "Naveen Jindal","email" : "Naveen@gmail.com.com", "type" : "CSR" },
// 			{"name" : "Kumar Mangalam Birla","email" : "Kumar@gmail.com.com", "type" : "Customer" },
// 			{"name" : "Pawan Munjal","email" : "Pawan@gmail.com.com", "type" : "Customer" },
// 			{"name" : "Brijmohan Lall Munjal","email" : "Brijmohan@gmail.com.com", "type" : "Customer" },
// 			{"name" : "Sunil Kant Munjal","email" : "Sunil@gmail.com.com", "type" : "Customer" },
// 			{"name" : "P R Ramasubrahmaneya Rajha","email" : "aksahy@gmail.com.com", "type" : "Customer" },
// 			{"name" : "Shinzo Nakanishi","email" : "Shinzo@gmail.com.com", "type" : "Customer" },
// 			{"name" : "Murali K Divi","email" : "Murali@gmail.com.com", "type" : "Customer" }
// 		];
		
// 		User.collection.insert(userList, function(err) {
// 			if (err)
// 				console.log(err);
// 			done();
// 		})
// 	});

// 	afterEach(function(done) {
// 		User.collection.drop();
// 		done();
// 	});

// 	it('GET /api/users/type : Should return type of users', function(done) {
// 		chai.request(server)
// 		.get('/api/users/type')
// 		.end(function(err, res) {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			res.body.types.should.be.a('array');
// 			res.body.types[0].should.be.equal('Customer');
// 			res.body.types[1].should.be.equal('CSR');
// 			done();
// 		})
// 	})

// 	it('GET /api/users : should return list of all users and links', function(done) {
// 		chai.request(server)
// 		.get('/api/users')
// 		.end(function(err, res) {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			res.body.users.should.be.a('array');
// 			expect(res.body.users).to.have.lengthOf(10);
// 			// console.log(res.body.users);
// 			done();
// 		})
// 	})


// 	it('GET /api/users/:id : should return a user and links', function(done) {
// 		var query = User.find();
// 		query.exec(function(err, res) {
// 			var user = res[0];

// 			chai.request(server)
// 			.get('/api/users/' + user._id)
// 			.end(function(err, res) {
// 				res.should.have.status(200);
// 				res.should.be.json;	
// 				// console.log(user)
// 				// console.log(res)
// 				userShouldBeEqual(user, res.body.user);
// 				done();	
// 			})
			
// 		})
// 	})

// 	it('DELETE /api/users/:id : should return a user and links', function(done) {
// 		var query = User.find();
// 		query.exec(function(err, res) {
// 			var user = res[0];

// 			chai.request(server)
// 			.delete('/api/users/' + user._id)
// 			.end(function(err, res) {
// 				res.should.have.status(200);
// 				res.should.be.json;	
// 				// console.log(user)
// 				// console.log(res)
// 				// userShouldBeEqual(user, res.body.user);
// 				done();	
// 			})
			
// 		})
// 	})

// 	it('GET /api/users/customers : should return list of customers', function(done) {
// 		chai.request(server)
// 		.get('/api/users/customers')
// 		.end(function(err, res) {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			res.body.users.should.be.a('array');
// 			expect(res.body.users).to.have.lengthOf(7);
// 			// console.log(res.body.users);
// 			done();
// 		})
// 	})

// 	it('GET /api/users/customers : should return list of CSR', function(done) {
// 		chai.request(server)
// 		.get('/api/users/csrs')
// 		.end(function(err, res) {
// 			res.should.have.status(200);
// 			res.should.be.json;
// 			res.body.users.should.be.a('array');
// 			expect(res.body.users).to.have.lengthOf(3);
// 			// console.log(res.body.users);
// 			done();
// 		})
// 	})

// 	it('POST /api/users/ : should create a new user', function(done) {
// 		chai.request(server)
// 		.post('/api/users')
// 		.send({'name': 'Foo Bar', 'email' : 'foo@bar.com'})
// 		.end(function(err, res) {
// 			res.should.have.status(201)
// 			res.should.be.json;
// 			userHasAllFields(res.body.user);
// 			res.body.user.name.should.equal('Foo Bar');
// 			res.body.user.email.should.equal('foo@bar.com');
// 			res.body.user.type.should.equal('Customer');
// 			done();
// 		})
// 	})

// 	it('POST /api/users/ : should not create a new user. Missing Email', function(done) {
// 		chai.request(server)
// 		.post('/api/users')
// 		.send({'name': 'Foo Bar'})
// 		.end(function(err, res) {
// 			res.should.have.status(400)
// 			res.should.be.json;
// 			done();
// 		})
// 	})

// 	it('POST /api/users/ : should not create a new user. Missing Name', function(done) {
// 		chai.request(server)
// 		.post('/api/users')
// 		.send({'email': 'foo@bar.com'})
// 		.end(function(err, res) {
// 			res.should.have.status(400)
// 			res.should.be.json;
// 			done();
// 		})
// 	})

// 	function userHasAllFields(userobject) {
// 		userobject.should.have.property('name');
// 		userobject.should.have.property('email');
// 		userobject.should.have.property('isActive');
// 		userobject.should.have.property('type');
// 		userobject.should.have.property('image');
// 		userobject.should.have.property('_id');
// 	}

// 	function userShouldBeEqual(user1, user2) {
// 		user1.name.should.be.equal(user2.name);
// 		user1.email.should.be.equal(user2.email);
// 		// user1._id.should.be.equal(user2._id);
// 		user1.isActive.should.be.equal(user2.isActive);
// 		user1.image.should.be.equal(user2.image);
// 		user1.type.should.be.equal(user2.type);
// 	}
// });
