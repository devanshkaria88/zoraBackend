# Zora Backend

A TypeScript-based Node.js and MongoDB backend application following the MVC architecture pattern.

## Features

- TypeScript for type safety
- Express.js for API routing
- MongoDB with Mongoose for data storage
- MVC architecture pattern
- Error handling
- Logging with Winston
- Security with Helmet
- CORS enabled
- Compression for performance
- Environment variables configuration

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Controllers for handling requests
├── interfaces/       # TypeScript interfaces
├── middlewares/      # Express middlewares
├── models/           # Mongoose models
├── routes/           # Express routes
├── utils/            # Utility functions
└── server.ts         # Entry point
```

## Prerequisites

- Node.js (>= 14.x)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=8008
   MONGO_URI=mongodb://localhost:27017/zora_db
   ```

## Development

Run the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

## Build

Build the project:
```bash
npm run build
```
or
```bash
yarn build
```

## Production

Start the production server:
```bash
npm start
```
or
```bash
yarn start
```

## API Endpoints

### Health Check
- `GET /health` - Check if the server is running

### Users
- `GET /api/users/by-wallet?walletAddress={address}` - Get user by wallet address or create if not exists
- `PUT /api/users/:walletAddress` - Update user settings
- `DELETE /api/users/:walletAddress` - Delete user

## Postman Collection

A Postman collection is included in the root directory to help test the API endpoints:
- `zoraBackend.postman_collection.json` - Collection with all API endpoints
- `zoraBackend.postman_environment.json` - Environment variables for local testing

To use the Postman collection:
1. Import both files into Postman
2. Select the "Zora Backend - Local" environment
3. Start the server using `npm run dev`
4. Test the API endpoints through Postman

## License

MIT
