MERN Book Search Engine
Introduction
The MERN Book Search Engine is a full-stack application that allows users to search for books via the Google Books API, save their favorite books, and manage their collection. It leverages the MERN stack (MongoDB, Express.js, React, and Node.js) and has been enhanced with GraphQL for efficient data management.

Features
Book search with Google Books API
User authentication with JWT
Save and manage a personal book collection
Real-time UI updates with React
Installation
To get started with this project:

Clone the repository:
git clone https://github.com/your-repo/mern-book-search-engine.git

Install dependencies:
cd mern-book-search-engine
npm install

Start the application:
npm run develop

Usage
After installation, navigate to http://localhost:3000 to access the application. Use the search feature to look for books and save them to your profile.

Project Structure
MERN Book Search Engine
├── client
│   ├── dist
│   ├── node_modules
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── pages
│   │   │   ├── SavedBooks.jsx
│   │   │   └── SearchBooks.jsx
│   │   ├── utils
│   │   │   ├── API.js
│   │   │   ├── apollo.js
│   │   │   ├── auth.js
│   │   │   ├── localStorage.js
│   │   │   └── mutations.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
└── server
    ├── config
    │   └── connection.js
    ├── controllers
    │   └── user-controller.js
    ├── models
    │   ├── Book.js
    │   ├── index.js
    │   └── User.js
    ├── node_modules
    ├── routes
    │   └── index.js
    ├── schemas
    │   ├── resolvers
    │   │   └── ...
    │   ├── typeDefs.js
    │   └── ...
    ├── utils
    │   └── auth.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── .gitignore
    ├── .npmrc
    ├── insertData.js
    ├── package-lock.json
    ├── package.json
    └── README.md
    
Key Files and Notes
Client Side
Root Component
App.jsx: Core component wrapping the application with ApolloProvider.
Root Setup
main.jsx: Initializes routing using React Router v6.
Pages
SavedBooks.jsx: Uses GraphQL queries and mutations for managing saved books.
SearchBooks.jsx: Implements search functionality and saving books via GraphQL.
Components
LoginForm.jsx: Handles user login with GraphQL LOGIN_USER mutation.
Navbar.jsx: Provides navigation and user authentication status.
SignupForm.jsx: Manages user registration with GraphQL ADD_USER mutation.
Utilities
API.js: Contains functions for user and book management via REST API.
apollo.js: Configures Apollo Client for GraphQL interactions.
auth.js: Provides authentication utility functions using JWT.
localStorage.js: Manages book IDs in the browser's local storage.
mutations.js: Defines GraphQL mutations for user and book operations.
Styling
App.css: Sets global styles for the application.
Server Side
connection.js: Configures MongoDB connection.
user-controller.js: Handles user-related operations.
Book.js, User.js: Mongoose models for the application.
index.js (routes): Defines the route structure for the server.
typeDefs.js, resolvers: GraphQL schema and resolver definitions.
auth.js (utils): Utility functions for server-side authentication.