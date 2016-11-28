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
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

exports.TICKETS_LIST = [
{ 
	'_id' : new ObjectId('57b1620c0769871e1a0762f0'), 
	'description' : 'Open, Technical', 
	'_customer' : new ObjectId('57b1611bc4615a13126438c1'), 
	'_createdBy' : new ObjectId('57b16065c4615a13126438be'), 
	'_assignedTo' : new ObjectId('57b16065c4615a13126438be'), 
	'area' : 'Technical', 
	'status' : 'Open', 
	'comments' : [], 
	'dateCreated' : new Date('2016-08-15T12:02:44.682+0530'), 
	'__v' : 0 
},
{ 
	'_id' : new ObjectId('57b162220769871e1a0762f1'), 
	'description' : 'New, Technical', 
	'_customer' : new ObjectId('57b1613fc4615a13126438c4'), 
	'_createdBy' : new ObjectId('57b16072c4615a13126438bf'), 
	'_assignedTo' : new ObjectId('57b16103c4615a13126438c0'), 
	'area' : 'Technical', 
	'status' : 'New', 
	'comments' : [], 
	'dateCreated' : new Date('2016-08-15T12:03:06.428+0530'), 
	'__v' : 0 
},
{ 
	'_id' : new ObjectId('57b162380769871e1a0762f2'), 
	'description' : 'Open, Delivery Issue, 2 Comments', 
	'_customer' : new ObjectId('57b16127c4615a13126438c2'), 
	'_createdBy' : new ObjectId('57b16103c4615a13126438c0'), 
	'_assignedTo' : new ObjectId('57b16065c4615a13126438be'), 
	'area' : 'Delivery Issue', 
	'status' : 'Open', 
	'comments' : [ 
		{ 
			'description' : 'Comment 1', 
			'_id' : new ObjectId('57b162660769871e1a0762f6'), 
			'dateCreated' : new Date('2016-08-15T12:04:11.289+0530')
		}, 
		{ 
			'description' : 'Comment 2', 
			'_id' : new ObjectId('57b162660769871e1a0762f5'), 
			'dateCreated' : new Date('2016-08-15T12:04:12.891+0530')
		}], 
	'dateCreated' : new Date('2016-08-15T12:03:28.346+0530'), 
	'__v' : 0 
},
{ 
	'_id' : new ObjectId('57b162bd0769871e1a0762f7'), 
	'description' : 'Closed, Misc', 
	'_customer' : new ObjectId('57b1611bc4615a13126438c1'), 
	'_createdBy' : new ObjectId('57b16072c4615a13126438bf'), 
	'_assignedTo' : new ObjectId('57b16072c4615a13126438bf'), 
	'area' : 'Misc', 
	'status' : 'Closed', 
	'comments' : [], 
	'dateCreated' : new Date('2016-08-15T12:05:41.779+0530'), 
	'__v' : 0 },
{ 
	'_id' : new ObjectId('57b162d20769871e1a0762f8'), 
	'description' : 'Closed, Technical, 3 comments', 
	'_customer' : new ObjectId('57b1614bc4615a13126438c5'), 
	'_createdBy' : new ObjectId('57b16103c4615a13126438c0'), 
	'_assignedTo' : new ObjectId('57b16065c4615a13126438be'), 
	'area' : 'Technical', 
	'status' : 'Closed', 
	'comments' : [ 
	{ 
		'_id' : new ObjectId('57b162e40769871e1a0762fe'), 
		'description' : 'Comment 1', 
		'dateCreated' : new Date('2016-08-15T12:06:15.493+0530'),
	}, 
	{ 
		'_id' : new ObjectId('57b162e40769871e1a0762fd'), 
		'description' : 'Comment 2', 
		'dateCreated' : new Date('2016-08-15T12:06:17.137+0530'),
	}, 
	{ 
		'_id' : new ObjectId('57b162e40769871e1a0762fc'),
		'description' : 'Comment 3', 
		'dateCreated' : new Date('2016-08-15T12:06:19.151+0530'),
	}], 
	'dateCreated' : new Date('2016-08-15T12:06:02.600+0530'), 
	'__v' : 0 },
]
