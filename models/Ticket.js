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
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;	


var TicketSchema = new Schema({
	_customer: {type: Schema.Types.ObjectId, ref: 'User'},
	_createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	_assignedTo: {type: Schema.Types.ObjectId, ref: 'User'},
	description: {type: String, required: true},
	dateCreated: {type: Date, default: Date.now},
	comments: [{
		author: {type: Schema.Types.ObjectId, ref: 'User'},
		description: String,
		dateCreated: {type: Date, default: Date.now}
	}],
	status: {
		type: String,
		enum: ['New', 'Open', 'Closed'],
		default: 'New'
	},

	area: {
		type: String,
		enum: ['Technical', 'Payment Related', 'Delivery Issue', 'Misc'],
		default: 'Misc'
	}
});

module.exports = mongoose.model('Ticket', TicketSchema);
