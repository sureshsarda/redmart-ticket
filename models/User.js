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
