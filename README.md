# User Authentication System Using MERN

## Table of Contents

1. [About the Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Live Demo](#live-demo)
5. [Installation & Setup](#installation--setup)
   - [Clone the Repository](#1-clone-the-repository)
   - [Create .env Files](#2-create-env-files)
   - [Docker Setup](#3-docker-setup)
   - [Backend Setup (Without Docker)](#4-backend-setup-without-docker)
   - [Frontend Setup (Without Docker)](#5-frontend-setup-without-docker)
6. [Access the Application](#access-the-application)
7. [Scripts](#scripts)
8. [Contributing](#contributing)
9. [License](#license)

---

## About the Project

The **User Authentication System Using MERN** project implements a secure and fully functional user authentication system. Built using the MERN stack (MongoDB, Express, React, Node.js), it includes features such as user registration, login, logout, email verification, and password reset via OTP sent to the user's email. It leverages **JSON Web Tokens (JWT)** for secure user authentication and session management.

This project is designed with the following goals:

- Secure authentication flow for users
- Email-based OTP for password reset functionality
- Containerized application using **Docker** for easier deployment and management

The backend of the application is powered by **Node.js and Express**, while the frontend uses **React** with **Tailwind CSS** for a responsive user interface. **Nodemailer** is used for sending verification emails and password reset links.

---

## Tech Stack

### Frontend (Client)

- **React** – UI development
- **React Router DOM** – Routing management
- **Axios** – API calls
- **Tailwind CSS** – Styling
- **React Toastify** – Notifications

### Backend (Server)

- **Node.js & Express.js** – Backend framework
- **MongoDB & Mongoose** – NoSQL database
- **bcryptjs** – Password hashing
- **JSON Web Tokens (JWT)** – Authentication
- **Nodemailer** – Email notifications
- **dotenv** – Environment variable management

### Docker

- **Docker** – Containerization of the frontend and backend for consistent development and deployment environments.

---

## Features

- **User Authentication**: Secure user registration, login, and logout functionalities.
- **JWT Authentication**: Token generation and verification for secure session management.
- **Email Verification & OTP**: OTP-based email verification and password reset system.
- **Secure Password Storage**: Passwords are securely stored using bcryptjs.
- **Responsive UI**: Built with React and styled with Tailwind CSS for an optimized, mobile-friendly experience.
- **Dockerized**: Full Docker support for easy setup, containerization, and deployment.

---

## Live Demo

Check out the live demo of the project: [MERN User Authentication System](https://mern-authentication-project.netlify.app/)

---

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/RAJESH2132/SecureAuth-MERN.git
cd SecureAuth-MERN
```

### 2. Create `.env` Files

Before starting the application, create the necessary `.env` files.

- **Backend (.env file)**:

  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  NODE_ENV='development'
  SMTP_USER=your_email
  SMTP_PASS=your_email_password
  SENDER_EMAIL=your_sender_email
  ```

- **Frontend (.env file)**:
  ```
  VITE_BACKEND_URL=http://localhost:4000
  ```

### 3. Docker Setup

To run the project with Docker, follow these steps:

- **Build the Docker containers:**

  ```sh
  docker-compose build
  ```

- **Run the Docker containers:**
  ```sh
  docker-compose up
  ```

This will spin up the backend, frontend, and MongoDB services in isolated Docker containers.

### 4. Backend Setup (Without Docker)

If you prefer not to use Docker, follow these steps to set up the backend locally:

```sh
cd server
npm install
```

- Create a `.env` file in the `server` directory (as mentioned above).
- Start the backend server:
  ```sh
  npm run server
  ```

### 5. Frontend Setup (Without Docker)

```sh
cd ../client
npm install
```

- Create a `.env` file in the `client` directory (as mentioned above).
- Start the frontend development server:
  ```sh
  npm run dev
  ```

---

## Access the Application

After completing the setup, you can access the application via the following URLs:

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:4000](http://localhost:4000)

---

## Scripts

### Client

| Script            | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Starts the development server          |
| `npm run build`   | Builds the project for production      |
| `npm run lint`    | Lints the project for potential issues |
| `npm run preview` | Previews the production build          |

### Server

| Script           | Description                                        |
| ---------------- | -------------------------------------------------- |
| `npm start`      | Starts the backend server                          |
| `npm run server` | Starts the server in development mode with nodemon |

---

## Contributing

Contributions are welcome! If you would like to contribute, feel free to submit a pull request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
