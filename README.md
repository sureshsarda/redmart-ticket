
# Redmart Ticket Tracker
***

## REST Endpoints

### User
GET 	/api/users/				Returns all users
POST	/api/users/				Creates a new user

GET 	/api/users/customer 	Returns all users of type 'Customer'
GET 	/api/users/csr 			Returns all users of type 'CSR'

DELETE	/api/users/{id}			Delete user by Id
GET 	/api/users/{id}			Get details of user by Id

### Ticket
GET 	/api/tickets/			Returns all tickets
POST	/api/tickets/			Create a new ticket

GET  	/api/ticket/{id}		Get a ticket by Id
PUT 	/api/ticket/{id}		Update a ticket by Id
DELETE 	/api/ticket/{id}		Delete a ticket by Id

POST 	/api/ticket/{id}/comment 	Add a comment to the ticket with Id 


## Pending Issues

### Features
 - TODO Comments should get updated immediately when added
 - TODO User should get updated immediately when added
 - TODO Perform validation on parameters passed to *route.js files
 - TODO	Delete a ticket
 - TODO Delete and Update a user, also view details of user
 - TODO Validation on ticket creation
