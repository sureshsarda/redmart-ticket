var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;	


var UserSchema = new Schema({
	name: String,
	email: {type: String, required: true, unique: true},
	type: {
		type: String,
		enum: ['Customer', 'Admin'],
		default: 'Customer'
	},
});

module.exports = mongoose.model('User', UserSchema);
