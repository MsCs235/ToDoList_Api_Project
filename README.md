# ToDo List Application

## Overview
The ToDo List Application is a robust web application built using Node.js, Express, and MongoDB. It provides users with the ability to register, log in, and manage their notes effectively. Users can create, view, edit, and delete notes, all while maintaining a secure session.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features
- **User Registration and Authentication**: Secure user sign-up and login functionality.
- **CRUD Operations for Notes**: Create, read, update, and delete notes with ease.
- **Session Management**: Persistent user sessions using cookies for enhanced security.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js to simplify routing and middleware management.
- **MongoDB**: NoSQL database for storing user and note data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: Library for hashing passwords securely.
- **EJS**: Templating engine for rendering views (if applicable).


## Usage
- The application will be accessible at `http://localhost:3000`.
- **User Registration**: Use the `/auth/signup` endpoint to create a new user account.
- **User Login**: Use the `/auth/login` endpoint to authenticate and log in.
- **Note Management**: Utilize the `/note` endpoints to create, view, edit, and delete notes.

## Project Structure
```
.
├── app.js               # Main application entry point
├── models               # Contains Mongoose models for data representation
│   ├── Note.js          # Schema and model for notes
│   └── User.js          # Schema and model for users
├── routes               # Contains route handlers for different functionalities
│   ├── auth.js          # Authentication-related routes
│   └── note.js          # Note management routes
├── Middleware.js        # Middleware for user authentication checks
```
