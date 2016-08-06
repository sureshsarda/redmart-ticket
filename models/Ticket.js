var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;	


var TicketSchema = new Schema({
	_customer: {type: Schema.Types.ObjectId, ref: 'User'},
	_createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	_assignedTo: {type: Schema.Types.ObjectId, ref: 'User'},
	description: {type: String, required: true},
	dateCreated: {type: Date, default: Date.now},
	lastModified: {type: Date, default: Date.now},
	comments: [{
		author: {type: Schema.Types.ObjectId, ref: 'User'},
		description: String,
		dateCreated: {type: Date, default: Date.now}
	}],
	status: {
		type: String,
		enum: ['New', 'Open', 'Closed'],
		default: 'New'
	}
});

module.exports = mongoose.model('Ticket', TicketSchema);
