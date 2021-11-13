// importing dependencies
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

// db connection from index.js file
import db from "./models/index.js";

// create app through express
const app = express();

// reading environmetal variable file
dotenv.config();

app.use(cors());

// parse requests of content-type - application/json
// to handle HTTP POST POST requests
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
