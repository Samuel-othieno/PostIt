# PostIt Application

## Overview

**PostIt** is a full-stack application that allows users to create groups for notifications. Users can register, create groups, add other users to groups, and post messages to these groups. The application is built using React for the frontend, Node.js and Express for the backend, and Redux for state management.

### Table of Contents

1. Technologies Used
2. Project Structure
3. Setup Instructions
4. Frontend
5. Backend
6. API Endpoints
7. Testing
8. Deployment

### Technologies Used

| Frontend                                  | Backend                            |
|:------------------------------------------|:-----------------------------------|
| React                                     | Node.js                            |
| Redux                                     | Express.js                         |
| Redux Toolkit                             | PostgreSQL                         |
| React-Redux                               | Prisma                             |
| Axios                                     | JOI                                |
| Vite                                      | Bcrypt                             |
| Material Design for Bootstrap (MDB)       | HTTP Status Codes                  |
| SCSS                                      | DOTENV                             |
| Webpack                                   | CORS                               |
| Babel                                     | JSON Web Token                     |
| Tailwind                                  | Nodemon                            |
| Mantine                                   | Express-validator                  |


**_Template_**: Contains the initial HTML, CSS, and JavaScript files that serve as the blueprint for the user interface.

**_Client_**: Contains the React application, including components, Redux store, and API service.

**_Server_**	Contains the backend code, including API routes and server configuration.

## Setup Instructions

### Prerequisites

+ Node.js installed on your Machine
+ PostgreSQL database server running

##### Clone the Repository

```
git clone https://github.com/your-username/PostIt.git

cd PostIt
```

##### Setting Up the Template Directory

1. Navigate to the template Directory:

```
cd template
```

2. Install Dependencies:

```
npm install
```

3. Compile SCSS to CSS:

```
npm run sass
```

##### Setting Up the Client Directory
1. Navigate to the client Directory:

```
cd ../client
```

2. Create a New React Application with Vite:

```
npm create vite@latest postit-client --template react
cd postit-client
npm install
```

3. Install Additional Dependencies:

```
npm install @reduxjs/toolkit react-redux axios mdbootstrap
```

4. Start the Development Server:

```
npm run dev
```

##### Setting Up the Server Directory

1. Navigate to the server Directory:

```
cd ../../server
```

2. Initialize a Node.js Project and add the Prisma CLI as a development dependency to it:

```
npm init -y

npm install express cors morgan prisma nodemon http-status-codes Joi bcrypt dotenv
```

3. Invoke the Prisma CLI by prefixing it with `npx`:

```
npx prisma
```

4. Set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```
npx prisma init
```

5. Connect your database

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
###  Note

You now need to adjust the connection URL to point to your own database.

The format of the connection URL for your database depends on the database you use. For PostgreSQL, it looks as follows (the parts spelled all-uppercased are placeholders for your specific connection details):

    postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA


##### Here's a short explanation of each component:

`USER`: The name of your database user

`PASSWORD`: The password for your database user

`HOST`: The name of your host name (for the local environment, it is localhost)

`PORT`: The port where your database server is running (typically 5432 for PostgreSQL)

`DATABASE`: The name of the database

`SCHEMA`: The name of the schema inside the database

6. Map your data model to the database schema using CLI

```
npx prisma migrate dev --name init
```

7. Install and generate Prisma Client

```
npm install @prisma/client
```

8. Update the scripts section of your `package.json` file to use Nodemon for starting your server.

```
"scripts": {
    "start": "nodemon index.js",
    "test": "jest"
}
```

9. Start the Server:

```
npm run
```

## Frontend

### Structure

| File	                        | Description
|:------------------------------|:---------------------------------------------| 
| src/index.js	                | Entry point for the React application.       |
| src/App.js	                | Main App component that renders the application.|
| src/store.js	                | Redux store configuration using Redux Toolkit.|
| src/reducers/userReducer.js	| Redux slice for managing user state.          |
| src/reducers/groupReducer.js	| Redux slice for managing group state.         |
| src/components/Register.js	| React component for user registration.        |
| src/components/Group.js	    | React component for group creation.           |
| src/api.js	                | API service for making HTTP requests to the backend.|

### Key Components

- [x] **_Register_**: Handles user registration.
- [x] **_Group_**: Handles group creation.

### API Integration

- [x] **_Axios_**: Used to make HTTP requests to the backend API.

## Backend

### Structure

| File                      | 	Description |
|:--------------------------|:---------------------------------|
| server.js	                | Main server file that sets up the Express server and defines the API routes. |


### API Endpoints


| Method     | Endpoint	                   | Description                             | 
|------------|-----------------------------|-----------------------------------------| 
| POST       | /api/user/signup	           | Endpoint for user signup.               | 
| POST	     |/api/user/signin	           | Endpoint for user signin.               |
| POST	     |/api/group	               | Endpoint for creating a new group.      |
| POST	     |/api/group/:groupId/user     | Endpoint for adding a user to a group.
| POST	     |/api/group/:groupId/message  | Endpoint for posting a message to a group.|
| GET	     |/api/group/:groupId/messages | Endpoint for retrieving messages for a group.|

## Testing

### Frontend

+ Enzyme: Used for testing React components.
+ Jest: Used for unit testing Redux actions and reducers.

### Backend
+ Mocha: Used for testing API endpoints.
+ Chai: Assertion library for testing.

## Deployment

### Frontend

+ Heroku: Used to deploy the React application.

### Backend

+ Heroku: Used to deploy the Express server.

#### Steps to Deploy

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
heroku static:deploy
```