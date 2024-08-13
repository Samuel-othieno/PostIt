# PostIt Application

## Overview  

PostIt is a full-stack application that allows users to create groups for notifications. Users can register, create groups, add other users to groups, and post messages to these groups. The application is built using React for the frontend, Node.js and Express for the backend, and Redux for state management.  

## Table of Contents

1. Technologies Used
2. Project Structure
3. Setup Instructions
    - Frontend
    - Backend
4. API Endpoints
5. Testing
6. Deployment

## Technologies Used

| Frontend Technologies                  | Backend Technologies               |
|:---------------------------------------|:-----------------------------------|
| React                                  | Node.js                            |
| Redux                                  | Express                            |
| Redux Toolkit                          | PostgreSQL                         |
| React-Redux                            | Prisma                             |
| Fetch API                              | CORS                               |
| Vite                                   | DOTENV                             |
| Material Design for Bootstrap (MDB)    | JOI                                |
| SCSS                                   | Morgan                             |
| Mantin                                 | Express Validator                  |
| Tailwind                               | HTTP STATUS CODES                  |
| WebPack                                | JSON Web Token (JWT)               |

## Project Structure

The project is divided into three main directories:
- **template**: 
Contains the initial HTML, CSS, and JavaScript files that serve as the blueprint for the user interface.

- **client**: 
Contains the React application, including components, Redux store, and API service.

- **server**:
Contains the backend code, including API routes and server configuration.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.

### Clone the Repository

**bash** 

```
git clone https://github.com/your-username/PostIt.git
cd PostIt
```

### Setting Up the Template Directory

Navigate to the template Directory:

```
cd template
```

Install Dependencies:

```
npm install
```

Compile SCSS to CSS:

```
npm run sass
```

### Setting Up the Client Directory

Navigate to the client Directory:

```
cd ../client
```

Create a New React Application with Vite:

```
npm create vite@latest postit-client --template react

cd postit-client

npm install
```

Install Additional Dependencies:

```
npm install @reduxjs/toolkit react-redux axios mdbootstrap
```
Start the Development Server:

```
npm run dev
```
Setting Up the Server Directory
Navigate to the server Directory:

```
cd ../../server
```
Initialize a Node.js Project:

```
npm init -y
```

Install Dependencies:

```
npm install express body-parser cors
```

Start the Server:

```
node server.js
```

## Frontend

### Structure

```
src/index.js: Entry point for the React application.
src/App.js: Main App component that renders the application.
src/store.js: Redux store configuration using Redux Toolkit.
src/reducers/userReducer.js: Redux slice for managing user state.
src/reducers/groupReducer.js: Redux slice for managing group state.
src/components/Register.js: React component for user registration.
src/components/Group.js: React component for group creation.
src/api.js: API service for making HTTP requests to the backend.
```

### Key Components

Register: Handles user registration.
Group: Handles group creation.
API Integration
Axios: Used to make HTTP requests to the backend API.

## Backend

### Structure

server.js: Main server file that sets up the Express server and defines the API routes.

### API Endpoints

```
POST /api/user/signup: Endpoint for user signup.
POST /api/user/signin: Endpoint for user signin.
POST /api/group: Endpoint for creating a new group.
POST /api/group/:groupId/user: Endpoint for adding a user to a group.
POST /api/group/:groupId/message: Endpoint for posting a message to a group.
GET /api/group/:groupId/messages: Endpoint for retrieving messages for a group.
```

## Testing

### Frontend

Enzyme: Used for testing React components.
Jest: Used for unit testing Redux actions and reducers.

### Backend

Mocha: Used for testing API endpoints.
Chai: Assertion library for testing.

## Deployment

### Frontend

* Heroku: Used to deploy the React application.

### Backend

Heroku: Used to deploy the Express server.

### Steps to Deploy

1. Login to Heroku:

```
heroku login
```

2. Create a New Heroku App:

```
heroku create postit-app
```

3. Deploy the Backend:


```
git push heroku main
```

4. Deploy the Frontend:


```
cd client/postit-client
npm run build
```
5. 


```
heroku static:deploy
```