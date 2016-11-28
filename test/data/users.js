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

exports.USER_LIST = [
	{ '_id' : new ObjectId('57b16065c4615a13126438be'), 'name' : 'Ava Chan', 'email' : 'ava@chan.com', 'type' : 'CSR', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b16072c4615a13126438bf'), 'name' : 'Maria Moller', 'email' : 'maria@moller.com', 'type' : 'CSR', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b16103c4615a13126438c0'), 'name' : 'Dale Adams', 'email' : 'dale@adams.com', 'type' : 'CSR', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b1611bc4615a13126438c1'), 'name' : 'Gilbert Woods', 'email' : 'gilbert@woods.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b16127c4615a13126438c2'), 'name' : 'Dylan Watts', 'email' : 'dylan@watts.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b16132c4615a13126438c3'), 'name' : 'Judd King', 'email' : 'judd@king.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b1613fc4615a13126438c4'), 'name' : 'Gabriella Freeman', 'email' : 'gabriella@freeman.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b1614bc4615a13126438c5'), 'name' : 'Sean Taylor', 'email' : 'sean@taylor.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b1615cc4615a13126438c6'), 'name' : 'Scott Muray', 'email' : 'scott@murray.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 },
	{ '_id' : new ObjectId('57b1616dc4615a13126438c7'), 'name' : 'Nellie Marshalls', 'email' : 'nellie@marshalls.com', 'type' : 'Customer', 'image' : 'https://eliaslealblog.files.wordpress.com/2014/03/user-200.png', 'isActive' : true, '__v' : 0 }
]