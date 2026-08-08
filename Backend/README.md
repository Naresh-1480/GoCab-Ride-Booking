# API Documentation

## `POST /users/register`
Create a new user account.

### Description
This endpoint registers a new user by validating the request body, hashing the password, and storing the user in the database. A JWT token is returned on success.

### Required Request Body
The request must include a JSON body with the following fields:

- `fullname.firstname` - required, minimum 3 characters
- `fullname.lastname` - optional, but supported by the endpoint
- `email` - required, must be a valid email address
- `password` - required, minimum 6 characters

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

### Status Codes
- `201 Created` - User successfully created
- `400 Bad Request` - Validation failed or required data is missing

### Example Success Response
```json
{
  "message": "User successfully created",
  "user": {
    "_id": "66b7f1c9e0a1c7b7f2a12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  },
  "token": "<jwt-token>"
}
```

### Example Validation Error Response
```json
{
  "message": "Validation Error",
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```
