# Unicorn Server

Express backend API built with TypeScript and MongoDB.

## Features

- 🚀 Express.js web framework
- 🔷 TypeScript for type safety
- 🗄️ MongoDB with Mongoose ODM
- ✅ Input validation with express-validator
- 🛡️ Security with Helmet
- 📝 Request logging with Morgan
- 🔄 CORS support
- ⚡ Hot reload with nodemon

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/unicorn
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000
```

### Development

```bash
npm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000).

### Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── config/           # Configuration files
│   └── database.ts  # MongoDB connection
├── controllers/      # Route controllers
│   └── userController.ts
├── middleware/       # Express middleware
│   ├── errorHandler.ts
│   └── validation.ts
├── models/          # Mongoose models
│   └── User.ts
├── routes/          # API routes
│   ├── index.ts
│   └── userRoutes.ts
├── types/           # TypeScript types
│   └── index.ts
├── utils/           # Utility functions
│   └── logger.ts
└── index.ts         # Application entry point
```

## API Endpoints

### Health Check

```
GET /health
GET /api/health
```

### Users

```
GET    /api/users      - Get all users
GET    /api/users/:id  - Get user by ID
POST   /api/users      - Create user
PUT    /api/users/:id  - Update user
DELETE /api/users/:id  - Delete user
```

### User Schema

```typescript
{
  name: string;      // Required, 2-50 characters
  email: string;     // Required, unique, valid email
  password: string;  // Required, min 6 characters
  createdAt: Date;   // Auto-generated
  updatedAt: Date;   // Auto-generated
}
```

### Example Requests

**Create User:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get All Users:**
```bash
curl http://localhost:5000/api/users
```

**Get User by ID:**
```bash
curl http://localhost:5000/api/users/[user_id]
```

**Update User:**
```bash
curl -X PUT http://localhost:5000/api/users/[user_id] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com"
  }'
```

**Delete User:**
```bash
curl -X DELETE http://localhost:5000/api/users/[user_id]
```

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error message",
  "stack": "Error stack (development only)"
}
```

## Validation

Request validation is handled by express-validator. Validation errors return:

```json
{
  "status": "fail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## MongoDB Setup

### Local MongoDB

```bash
# Start MongoDB
mongod

# Or with custom path
mongod --dbpath /path/to/data
```

### MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Security

- Helmet for security headers
- CORS configuration
- Input validation
- Error handling
- Password field hidden by default in queries

## Learn More

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

