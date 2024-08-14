# Server Directory

## Overview

The `server` directory contains the backend code for the PostIt application. This code is responsible for handling API requests, managing data, and serving the frontend application. The backend is built using Node.js and Express.

## Technologies Used

- **Node.js**: JavaScript runtime used to build the backend server.
- **Express**: Web framework for Node.js used to create the API endpoints.
- **Body-Parser**: Middleware used to parse incoming request bodies.
- **CORS**: Middleware used to enable Cross-Origin Resource Sharing.

## Files

- **server.js**: Main server file that sets up the Express server and defines the API routes.

## API Endpoints

- **POST /api/user/signup**: Endpoint for user signup.
- **POST /api/user/signin**: Endpoint for user signin.
- **POST /api/group**: Endpoint for creating a new group.
- **POST /api/group/:groupId/user**: Endpoint for adding a user to a group.
- **POST /api/group/:groupId/message**: Endpoint for posting a message to a group.
- **GET /api/group/:groupId/messages**: Endpoint for retrieving messages for a group.

## Progress
- Set up the Express server and configured middleware for parsing request bodies and enabling CORS.
- Defined API routes for user signup, signin, group creation, adding users to groups, posting messages, and retrieving messages.
- Implemented basic functionality for handling API requests and managing data.
