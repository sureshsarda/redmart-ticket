# Redmart Ticket Tracker
---
Redmart Ticket Tracker is a as the name suggests a ticket tracking application. Unlike a fullblown application like JIRA or Redmine, this is just a POC on ticket tracking and MEAN stack.

This application provides basic functionality like creating new ticket or users and modifying existing ones. It also provides provision to add comments on tickets. Items can be filtered on the basis of the users or their statuses. Items can also be deleted. Everything is provided as REST service by node and express which is consumed by Angular.

Users currently can be of 2 types - Customer and Customer Service Repos.

(This is just a POC hence I keep it improving it while I learn new things.)

---

## REST Endpoints

### User

|Verb	| Path			| Description|
|-------|-----------------------|---|
|`GET`  |`/api/users/`		|Returns all users|
|`POST`	|`/api/users/`		|Creates a new user|
|---	|**User by type**	|
|`GET` 	|`/api/users/customer` 	|Returns all users of type 'Customer'|
|`GET` 	|`/api/users/csr`	|Returns all users of type 'CSR'|
|---	|**Operations by Id**|---|
|`DELETE`|`/api/users/{id}`	|Delete user by Id
|`GET` 	|`/api/users/{id}`	|Get details of user by Id
|---	|**Metadata**|---|
|`GET`	|`/api/users/option/type`	|Get type of users|

### Ticket
|Verb	| Path			| Description|
|-------|-----------------------|------------|
|`GET` 	|`/api/tickets/`	| Returns all tickets
|`POST`	|`/api/tickets/`	| Create a new ticket
|---	| ** By Id**		|---|
|`GET` 	|`/api/ticket/{id}`	| Get a ticket by Id
|`PUT` 	|`/api/ticket/{id}`	| Update a ticket by Id
|`DELETE`|`/api/ticket/{id}`	| Delete a ticket by Id
|---	|---			|---
|`POST` |`/api/ticket/{id}/comment`|Add a comment to the ticket with Id 
|---	|**Metadata**		|---
|`GET` 	|`/api/users/option/area`|Get type of users
|`GET` 	|`/api/users/option/status`|Get type of users


## Pending Issues

### Features
 - `DONE` Comments should get updated immediately when added
 - `DONE` User should get updated immediately when added
 - `TODO` Perform validation on parameters passed to *route.js files
 - `DONE` Delete a ticket
 - `TODO` Delete and Update a user, also view details of user
 - `TODO` Validation on ticket creation
 - `DONE` Separate ticket controllers in files.
 - `DONE` A comment is being added two times

### Refactoring
 - `DONE` Figure out a way to save routes in variables such that they can be used a different places wihout the doubt of typos.

 - `DONE` Do something about common variables like the enum values which are getting fetched everytime.	

## Contact
Suresh Sarda: (sureshssarda[at]gmail[dot]com)
