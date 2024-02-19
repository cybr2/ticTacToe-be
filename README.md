# Tic-Tac-Toe Backend API

This RESTful API serves as the backend for a Tic-Tac-Toe game application. It is built using Node.js with Express, Prisma, MongoDB, and deployed on Render.

## Endpoints

### Add Record

- **URL:** `/addRecord`
- **Method:** POST
- **Description:** Adds a new record to the database.
- **Request Body:**
  - `dateTime` (string): Date and time of the game session
  - `drawCount` (number): Number of draws in the game
  - `playerOne` (string): Name of player one
  - `playerOneWinCount` (number): Number of wins for player one
  - `playerOneLoseCount` (number): Number of losses for player one
  - `playerTwo` (string): Name of player two
  - `playerTwoWinCount` (number): Number of wins for player two
  - `playerTwoLoseCount` (number): Number of losses for player two
  - `roundCount` (number): Number of rounds played

### Get Records

- **URL:** `/getRecords`
- **Method:** GET
- **Description:** Retrieves all records from the database.
- **Response Body:** Array of records containing the same fields as the request body of the Add Record endpoint.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js used to create the RESTful API endpoints.
- **Prisma**: ORM (Object-Relational Mapping) tool used to interact with the MongoDB database.
- **MongoDB**: NoSQL database used to store game records and player information.
- **Render**: Cloud platform used for deploying and hosting the backend application.

## Deployment

The backend API is deployed on Render, a modern cloud provider that offers managed infrastructure and automatic scaling for web applications. The deployment process is seamless and ensures high availability and reliability of the API.
