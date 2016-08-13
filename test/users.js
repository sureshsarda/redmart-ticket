process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var mongoose = require('mongoose');
var User = mongoose.model('User');

chai.use(chaiHttp);


describe('Users', function() {

	User.collection.drop();

	beforeEach(function(done) {
		var newUser = new User({
			name: 'Suresh Sarda',
			email: 'sureshssarda@gmail.com'
		})
		newUser.save(function(err) {
			done();
		})
	});

	afterEach(function(done) {
		User.collection.drop();
		done();
	});

	it('should list ALL Users on /api/users GET', function(done) {
		chai.request(server)
		.get('/api/users')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body[0].should.have.property('name');
			res.body[0].should.have.property('email');
			res.body[0].should.have.property('isActive');
			res.body[0].should.have.property('type');
			res.body[0].should.have.property('image');
			res.body[0].should.have.property('_id');
			res.body[0].name.should.equal('Suresh Sarda');
			res.body[0].email.should.equal('sureshssarda@gmail.com');
			done();
		});
	});

	it('should add a single user based on name and email on /api/users POST', function(done) {
		chai.request(server)
		.post('/api/users')
		.send({'name': 'test user', 'email' : 'test@user.com'})
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.have.property('name');
			res.body.should.have.property('email');
			res.body.should.have.property('isActive');
			res.body.should.have.property('type');
			res.body.should.have.property('image');
			res.body.should.have.property('_id');
			res.body.name.should.equal('test user');
			res.body.email.should.equal('test@user.com');
			res.body.isActive.should.equal(true);
			res.body.type.should.equal('Customer');
			done();
		});
	});

	it('should add a single user based on all fields on /api/users POST', function(done) {
		chai.request(server)
		.post('/api/users')
		.send({
				'name': 'test user', 
				'email' : 'test@user.com',
				'isActive' : false,
				'image': 'NA',
				'type' : 'CSR'
			})
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.have.property('name');
			res.body.should.have.property('email');
			res.body.should.have.property('isActive');
			res.body.should.have.property('type');
			res.body.should.have.property('image');
			res.body.should.have.property('_id');
			res.body.name.should.equal('test user');
			res.body.email.should.equal('test@user.com');
			res.body.isActive.should.equal(false);
			res.body.image.should.equal('NA');
			res.body.type.should.equal('CSR');
			done();
		});
	});
});
