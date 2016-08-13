var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;	


var UserSchema = new Schema({
	name: String,
	email: {type: String, required: true, unique: true},
	isActive: {type: Boolean, default: true},
	image: {type: String, default: 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png'},
	type: {
		type: String,
		enum: ['Customer', 'CSR'],
		default: 'Customer'
	},
});

module.exports = mongoose.model('User', UserSchema);
