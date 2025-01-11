# User Authentication System Using MERN

This project implements a full-fledged user authentication system using the MERN stack (MongoDB, Express, React, Node.js). The system includes essential functionalities such as user registration, login, logout, email verification, and password reset through a secure six-digit OTP sent to the user's email. The system leverages JSON Web Tokens (JWT) for secure user authentication.

Key features of the system include:

- **User Authentication**: Allows users to register, login, and logout securely using JWT-based session management.
- **Email Verification**: Users must verify their email addresses during registration to ensure authenticity.
- **Password Reset**: Users can reset their passwords through a six-digit OTP sent to their registered email address.
- **Secure Authentication**: JWT is used for maintaining sessions and authorizing access to protected routes within the application.

The backend is built with Node.js and Express, while the frontend is created using React with Tailwind CSS for styling. The project also integrates Nodemailer for email notifications and bcryptjs for hashing passwords securely.

---

## Features

- **User Authentication**: Secure registration, login, and logout functionalities.
- **JWT Authentication**: Secure token generation and verification to maintain sessions.
- **Email Verification & OTP**: Dynamic email templates for OTP-based verification and password resets.
- **Secure Password Storage**: Passwords are hashed using bcryptjs for enhanced security.
- **Responsive UI**: Built with React and styled using Tailwind CSS for a clean and responsive design.

---

## Tech Stack

- **Frontend**:

  - React
  - React Router DOM
  - Axios
  - Tailwind CSS
  - React Toastify

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - bcryptjs for password hashing
  - JSON Web Tokens (JWT) for authentication
  - Nodemailer for sending emails
  - dotenv for environment variable management

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- MongoDB (either local or cloud-based)

### Steps to Set Up

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RAJESH2132/SecureAuth-MERN.git
   cd SecureAuth-MERN
   ```

2. **Install dependencies:**

   - For the backend:

     ```bash
     cd server
     npm install
     ```

   - For the frontend:
     ```bash
     cd ../client
     npm install
     ```

3. **Environment Variables:**

   - **Server (.env file)**:

     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV='development'
     SMTP_USER=your_email
     SMTP_PASS=your_email_password
     SENDER_EMAIL=your_sender_email
     ```

   - **Client (.env file)**:
     ```env
     VITE_BACKEND_URL=http://localhost:3000
     ```

4. **Run the Application:**

   - Start the backend server:

     ```bash
     cd server
     npm run server
     ```

   - Start the frontend development server:
     ```bash
     cd client
     npm run dev
     ```

5. **Access the application:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)

---

## Scripts

### Client

| Script            | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the development server         |
| `npm run build`   | Builds the project for production     |
| `npm run lint`    | Lint the project for potential issues |
| `npm run preview` | Preview the production build          |

### Server

| Script           | Description                                        |
| ---------------- | -------------------------------------------------- |
| `npm start`      | Starts the backend server                          |
| `npm run server` | Starts the server in development mode with nodemon |
