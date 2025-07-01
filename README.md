# Course App Backend

A robust Node.js backend API for managing courses, built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **Course Management**: Create, read, and delete courses
- **RESTful API**: Clean and intuitive API endpoints
- **Data Validation**: Input validation using Valibot
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full type safety and better developer experience
- **Testing**: Comprehensive test suite with Vitest
- **Code Quality**: ESLint, Biome, and Prettier for consistent code style
- **Git Hooks**: Pre-commit hooks with Husky for code quality
- **CORS**: Cross-origin resource sharing enabled
- **Logging**: HTTP request logging with Morgan

## 📋 Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- Node.js 18+ (for compatibility)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/course-app
```

## 🚀 Usage

### Development

```bash
bun run dev
```

The server will start with hot reload enabled at `http://localhost:3000`

### Production

```bash
bun run build
bun run start
```

### Testing

```bash
# Run tests once
bun run test

# Run tests in watch mode
bun run test:watch
```

### Code Quality

```bash
# Lint code
bun run lint

# Format code
bun run format
```

## 📡 API Endpoints

### Health Check

- `GET /` - Server information and status
- `GET /health` - Health check endpoint

### Courses

- `POST /api/v1/courses` - Create a new course
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course by ID
- `DELETE /api/v1/courses/:id` - Delete course by ID

## 📝 API Documentation

### Create Course

```http
POST /api/v1/courses
Content-Type: application/json

{
  "title": "Data Science Fundamentals",
  "instructor": "Dr. Emily Wong",
  "duration": "10 weeks",
  "mode": "online",
  "description": "Introduction to data analysis, visualization, and machine learning concepts using Python.",
  "prerequisites": "Python programming basics"
}
```

### Course Schema

```typescript
{
  title: string; // Course title (required)
  instructor: string; // Instructor name (required)
  duration: string; // Course duration (required)
  mode: 'online' | 'offline'; // Course mode (required)
  description: string; // Course description (required)
  prerequisites: string; // Prerequisites (required)
}
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── schema/         # Validation schemas
│   ├── services/       # Business logic
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── __test__/           # Test files
├── .github/            # GitHub workflows
├── .husky/             # Git hooks
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── biome.json
└── README.md
```

## 🧪 Testing

The project uses Vitest for testing with the following setup:

- Unit tests for controllers and services
- Integration tests for API endpoints
- In-memory MongoDB for testing
- Coverage reports with @vitest/coverage-v8

Run tests with:

```bash
bun run test
```

## 🔧 Configuration

### TypeScript

The project uses TypeScript with strict configuration for type safety.

### Code Quality Tools

- **Biome**: Fast linter and formatter
- **ESLint**: Additional linting rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks

### Database

MongoDB with Mongoose ODM for data modeling and validation.

## 🚀 Deployment

The application is configured for deployment on platforms like:

- Render
- Heroku
- Railway
- Digital Ocean

Make sure to set the following environment variables in your deployment platform:

- `PORT`
- `MONGODB_URI`
- `NODE_ENV=production`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Live API](https://course-backend-ed2v.onrender.com)
- [API Documentation](./api.rest) - REST client file for testing endpoints

## 📞 Support

If you have any questions or need help, please open an issue in the repository.
