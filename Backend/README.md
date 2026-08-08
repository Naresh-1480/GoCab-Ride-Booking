# API Documentation

This backend exposes user authentication routes under `/users`.

## `POST /users/register`
Create a new user account.

### Description
This endpoint validates the incoming data, checks whether the email already exists, hashes the password, and saves the new user in the database. On success, it returns the created user details and a JWT token.

### Required Request Body
Send a JSON object with the following structure:

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

### Field Rules
- `fullname.firstname` - required, minimum 3 characters
- `fullname.lastname` - optional
- `email` - required, must be a valid email address
- `password` - required, minimum 6 characters

### Status Codes
- `201 Created` - User successfully created
- `400 Bad Request` - Validation failed or required data is missing
- `409 Conflict` - A user with this email already exists

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

### Example Conflict Response
```json
{
  "message": "User with this email already exists"
}
```

## `POST /users/login`
Log in an existing user.

### Description
This endpoint validates the email and password, finds the user in the database, compares the provided password with the stored hash, and returns a JWT token when the credentials are valid.

### Required Request Body
Send a JSON object with the following structure:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Field Rules
- `email` - required, must be a valid email address
- `password` - required, minimum 6 characters

### Status Codes
- `200 OK` - User logged in successfully
- `400 Bad Request` - Validation failed or required data is missing
- `401 Unauthorized` - Email or password is invalid

### Example Success Response
```json
{
  "message": "User logged in successfully",
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

### Example Unauthorized Response
```json
{
  "message": "Invalid email or password"
}
```
