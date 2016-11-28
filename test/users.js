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
var userData = require('./data/users.js');

chai.use(chaiHttp);


describe('Users', function() {

	User.collection.drop();

	beforeEach(function(done) {
		// var USER_LIST = [
		// 	{ '_id' : new ObjectId('57b16065c4615a13126438be'), 'name' : 'Ava Chan', 'email' : 'ava@chan.com', 'type' : 'CSR', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b16072c4615a13126438bf'), 'name' : 'Maria Moller', 'email' : 'maria@moller.com', 'type' : 'CSR', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b16103c4615a13126438c0'), 'name' : 'Dale Adams', 'email' : 'dale@adams.com', 'type' : 'CSR', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b1611bc4615a13126438c1'), 'name' : 'Gilbert Woods', 'email' : 'gilbert@woods.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b16127c4615a13126438c2'), 'name' : 'Dylan Watts', 'email' : 'dylan@watts.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b16132c4615a13126438c3'), 'name' : 'Judd King', 'email' : 'judd@king.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b1613fc4615a13126438c4'), 'name' : 'Gabriella Freeman', 'email' : 'gabriella@freeman.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b1614bc4615a13126438c5'), 'name' : 'Sean Taylor', 'email' : 'sean@taylor.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b1615cc4615a13126438c6'), 'name' : 'Scott Muray', 'email' : 'scott@murray.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
		// 	{ '_id' : new ObjectId('57b1616dc4615a13126438c7'), 'name' : 'Nellie Marshalls', 'email' : 'nellie@marshalls.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 }
		// ]
		
		User.collection.insert(userData.USER_LIST, function(err) {
			if (err)
				console.log(err);
			done();
		})
	});

	afterEach(function(done) {
		User.collection.drop();
		done();
	});

	it('GET /api/users/type : Should return type of users', function(done) {
		chai.request(server)
		.get('/api/users/type')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.types.should.be.a('array');
			res.body.types[0].should.be.equal('Customer');
			res.body.types[1].should.be.equal('CSR');
			done();
		})
	})

	it('GET /api/users : should return list of all users and links', function(done) {
		chai.request(server)
		.get('/api/users')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.users.should.be.a('array');
			expect(res.body.users).to.have.lengthOf(10);
			// console.log(res.body.users);
			done();
		})
	})


	it('GET /api/users/:id : should return a user and links', function(done) {
		var query = User.find();
		query.exec(function(err, res) {
			var user = res[0];

			chai.request(server)
			.get('/api/users/' + user._id)
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;	
				// console.log(user)
				// console.log(res)
				userShouldBeEqual(user, res.body.user);
				done();	
			})
			
		})
	})

	it('DELETE /api/users/:id : should return a user and links', function(done) {
		var query = User.find();
		query.exec(function(err, res) {
			var user = res[0];

			chai.request(server)
			.delete('/api/users/' + user._id)
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;	
				// console.log(user)
				// console.log(res)
				// userShouldBeEqual(user, res.body.user);
				done();	
			})
			
		})
	})

	it('GET /api/users/customers : should return list of customers', function(done) {
		chai.request(server)
		.get('/api/users/customers')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.users.should.be.a('array');
			expect(res.body.users).to.have.lengthOf(7);
			// console.log(res.body.users);
			done();
		})
	})

	it('GET /api/users/customers : should return list of CSR', function(done) {
		chai.request(server)
		.get('/api/users/csrs')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.users.should.be.a('array');
			expect(res.body.users).to.have.lengthOf(3);
			// console.log(res.body.users);
			done();
		})
	})

	it('POST /api/users/ : should create a new user', function(done) {
		chai.request(server)
		.post('/api/users')
		.send({'name': 'Foo Bar', 'email' : 'foo@bar.com'})
		.end(function(err, res) {
			res.should.have.status(201)
			res.should.be.json;
			userHasAllFields(res.body.user);
			res.body.user.name.should.equal('Foo Bar');
			res.body.user.email.should.equal('foo@bar.com');
			res.body.user.type.should.equal('Customer');
			done();
		})
	})

	it('POST /api/users/ : should not create a new user. Missing Email', function(done) {
		chai.request(server)
		.post('/api/users')
		.send({'name': 'Foo Bar'})
		.end(function(err, res) {
			res.should.have.status(400)
			res.should.be.json;
			done();
		})
	})

	it('POST /api/users/ : should not create a new user. Missing Name', function(done) {
		chai.request(server)
		.post('/api/users')
		.send({'email': 'foo@bar.com'})
		.end(function(err, res) {
			res.should.have.status(400)
			res.should.be.json;
			done();
		})
	})

	it('GET /api/users/:id :  should not return object for invalid id', function(done) {
		chai.request(server)
		.get('/api/users/564bs')
		.end(function(err, res) {
			res.should.have.status(400);
			done();
		})
	})

	function userHasAllFields(userobject) {
		userobject.should.have.property('name');
		userobject.should.have.property('email');
		userobject.should.have.property('isActive');
		userobject.should.have.property('type');
		userobject.should.have.property('image');
		userobject.should.have.property('_id');
	}

	function userShouldBeEqual(user1, user2) {
		user1.name.should.be.equal(user2.name);
		user1.email.should.be.equal(user2.email);
		// user1._id.should.be.equal(user2._id);
		user1.isActive.should.be.equal(user2.isActive);
		user1.image.should.be.equal(user2.image);
		user1.type.should.be.equal(user2.type);
	}
});
