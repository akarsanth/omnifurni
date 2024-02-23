# Omnifurni - B2C E-Commerce Platform

## Project Overview

**Name:** Omnifurni  
**Version:** 1.0.0  
**Author:** Aakarshan Thapa  
**Description:** Omnifurni is a B2C (Business-to-Consumer) E-Commerce platform, developed as a final year project for a Bachelor's degree. This project aims to provide users with a seamless online shopping experience for furniture items, incorporating a single-vendor approach.

## Concurrent Frontend and Backend Runner

**Description:** For running the frontend and backend concurrently, Omnifurni uses a concurrent runner to streamline the development process.

### Tech Stack

- **Concurrently:** A utility for running multiple commands concurrently.

### Scripts

- **Run Concurrently:**
  ```bash
  npm run dev
  ```
  This script utilizes the `concurrently` package to run both the frontend and backend servers simultaneously, ensuring a synchronized development environment for Omnifurni.

## Frontend and Backend Integration

**Description:** In Omnifurni, both the frontend and backend are integrated into a single project for simplicity.

### Frontend Tech Stack

- **React.js:** A JavaScript library for building user interfaces.
- **Material-UI:** A popular React UI framework for creating elegant and responsive applications.
- **Redux Toolkit:** A set of tools for managing state in React applications.
- **Axios:** A promise-based HTTP client for making requests to the server.
- **React Router Dom:** A library for routing in React applications.
- **Formik:** A form library for React to facilitate form management.
- **Yup:** A schema validation library used in conjunction with Formik for form validation.
- **Styled-Components:** A CSS-in-JS library for styling React components.
- **dotenv:** A zero-dependency module for loading environment variables.

### Backend Tech Stack

- **Node.js:** A JavaScript runtime for server-side development.
- **Express.js:** A web application framework for Node.js.
- **Axios:** A promise-based HTTP client for making requests to external APIs.
- **Bcrypt.js:** A library for hashing and salting passwords.
- **Passport.js:** An authentication middleware for Node.js.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims to be transferred between two parties.
- **Sequelize:** A promise-based Node.js ORM for MySQL, providing an easy-to-use interface for database operations.
- **Cors:** A middleware for enabling Cross-Origin Resource Sharing in Express.js.
- **Helmet:** A middleware to secure Express.js applications by setting HTTP headers.
- **dotenv:** A zero-dependency module for loading environment variables.

### Common Scripts

- **Install Dependencies:**
  ```bash
  npm install
  ```
  Installs project dependencies.

### Getting Started

1. Clone the Omnifurni repository:

   ```bash
   git clone <repository-url>
   cd omnifurni
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the project concurrently:

   ```bash
   npm run dev
   ```

   This command initiates both the frontend and backend servers concurrently.

4. Open your browser and navigate to the appropriate URLs for the Omnifurni frontend and backend.

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:6000](http://localhost:6000)

Feel free to explore and enhance Omnifurni for your learning and development needs. If you encounter any issues or have suggestions for improvements, please refer to the respective frontend and backend README files. Happy coding!

# Dependencies (Modules) used to send email

1. Email JS => For contact us form. EmailJS helps to send emails using client-side technologies only
2. Nodemailer => To send email for verfication of email (For Forgot Password and user registration)
3. Mailchimp => To collect list of user email for newletter subscription
