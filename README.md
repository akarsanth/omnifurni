# Omnifurni - B2C E-Commerce Platform

## Project Overview

**Name:** Omnifurni  
**Version:** 1.0.0  
**Author:** Aakarshan Thapa

Omnifurni is a B2C (Business-to-Consumer) E-Commerce platform designed as a final year project for Bachelor's degree. The project focuses on creating a seamless online shopping experience for users interested in purchasing furniture. It provides a single-vendor platform, making it a one-stop solution for users seeking quality furniture items.

## Features

- **Concurrent Frontend and Backend:** The project utilizes the `concurrently` package to run frontend and backend servers concurrently, ensuring a smooth development experience.

## Tech Stack

- **Frontend:**

  - React JS
  - Material UI

- **Backend:**
  - Node.js
  - Express.js
  - Multer (for handling file uploads)

## Scripts

- **Run Concurrently:**
  ```bash
  npm run dev
  ```
  This script concurrently starts the frontend and backend servers, allowing for simultaneous development and testing.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd omnifurni
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Run the project concurrently:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Omnifurni web application.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

Feel free to explore and enhance Omnifurni for your learning and development needs. If you encounter any issues or have suggestions for improvements, please create an issue in the repository. Happy coding!

# Dependencies (Modules) used to send email

1. Email JS => For contact us form. EmailJS helps to send emails using client-side technologies only
2. Nodemailer => To send email for verfication of email (For Forgot Password and user registration)
3. Mailchimp => To collect list of user email for newletter subscription
