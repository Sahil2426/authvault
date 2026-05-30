# AuthVault 🔐

A production-ready, enterprise-grade authentication API built with Node.js, Express, and MongoDB. AuthVault can be used as a standalone authentication microservice that any application can integrate with.

---

## Features

- ✅ User registration with email verification
- ✅ JWT authentication with access and refresh tokens
- ✅ Secure login and logout with token invalidation
- ✅ Forgot and reset password via email
- ✅ Change password with automatic session invalidation
- ✅ Role-based access control (User / Admin)
- ✅ Get and update user profile
- ✅ Zod validation on all inputs
- ✅ Rate limiting on all auth routes
- ✅ Centralized error handling
- ✅ Interactive Swagger API documentation
- ✅ Clean MVC + Service layer architecture

---

## Tech Stack

| Technology         | Purpose           |
| ------------------ | ----------------- |
| Node.js            | Runtime           |
| Express.js         | Web framework     |
| MongoDB            | Database          |
| Mongoose           | ODM               |
| JWT                | Authentication    |
| Bcrypt             | Password hashing  |
| Nodemailer         | Email service     |
| Zod                | Input validation  |
| express-rate-limit | Rate limiting     |
| Morgan             | HTTP logging      |
| Swagger            | API documentation |

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── swagger.js         # Swagger configuration
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── token.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimiter.js
│   │   ├── role.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── Token.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── token.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── token.service.js
│   │   └── user.service.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   ├── validations/
│   │   ├── auth.validation.js
│   │   └── user.validation.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

## Getting Started

### Prerequisites

- Node.js v20+
- MongoDB Atlas account
- Mailtrap or Ethereal Email account

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/Sahil2426/authvault.git
cd authvault/backend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up environment variables:**

```bash
cp .env.example .env
```

Fill in your values in the `.env` file.

**4. Start the development server:**

```bash
npm run dev
```

Server will start at `http://localhost:5000`

---

## Environment Variables

Create a `.env` file in the `backend` directory with these variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@authvault.com

CLIENT_URL=http://localhost:5000
```

---

## API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

---

## API Endpoints

### Auth Routes `/api/v1/auth`

| Method | Endpoint                 | Description            | Auth Required |
| ------ | ------------------------ | ---------------------- | ------------- |
| POST   | `/register`              | Register a new user    | No            |
| GET    | `/verify-email/:token`   | Verify email address   | No            |
| POST   | `/login`                 | Login user             | No            |
| POST   | `/logout`                | Logout user            | No            |
| POST   | `/forgot-password`       | Request password reset | No            |
| POST   | `/reset-password/:token` | Reset password         | No            |

### Token Routes `/api/v1/token`

| Method | Endpoint   | Description          | Auth Required |
| ------ | ---------- | -------------------- | ------------- |
| POST   | `/refresh` | Get new access token | No            |

### User Routes `/api/v1/users`

| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| GET    | `/me`              | Get current user profile    | Yes           |
| PATCH  | `/me`              | Update current user profile | Yes           |
| PATCH  | `/change-password` | Change password             | Yes           |
| GET    | `/`                | Get all users               | Admin Only    |

---

## Architecture

```
Request → Route → Middleware → Controller → Service → Model → MongoDB
```

- **Routes** — Define URL patterns and apply middlewares
- **Middlewares** — Handle auth, validation, rate limiting, errors
- **Controllers** — Handle HTTP request and response
- **Services** — Contain all business logic
- **Models** — Define data structure and interact with MongoDB

---

## Rate Limiting

| Route              | Limit                      |
| ------------------ | -------------------------- |
| `/register`        | 5 requests per hour        |
| `/login`           | 5 requests per 15 minutes |
| `/forgot-password` | 3 requests per hour        |
| `/reset-password`  | 5 requests per 15 minutes  |
| `/verify-email`    | 10 requests per hour       |
| `/token/refresh`   | 30 requests per 15 minutes |

---

## License

MIT License — feel free to use this project for your own applications.

---

Built with ❤️ by [Sahil Pawar](https://github.com/Sahil2426)
