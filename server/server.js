// importing dependencies
import path from "path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import Mailchimp from "mailchimp-api-v3";

// reading environmetal variable file
import dotenv from "dotenv";
dotenv.config();

// importing error middlewares
import { notFound, errorHandler } from "./middlewares/error-middlewares.js";

// db connection from index.js file
// import db from "./models/index.js";
import("./config/passportJWT-setup.js");

// create app through express
const app = express();

// parse requests of content-type - application/json
// to handle HTTP POST POST requests
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// morgan, helmet and cors
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// create home route
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// Mailchimp
const { MAILCHIMP_API_KEY, LIST_ID } = process.env;
const mailchimp = new Mailchimp(MAILCHIMP_API_KEY);
app.get("/api/memberAdd", (req, res) => {
  mailchimp
    .post(`/lists/${LIST_ID}/members`, {
      email_address: req.query.email,
      status: "subscribed",
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// setting up api
// base api
import api from "./routes/index.js";
app.use("/api/v1", api);

// Upload
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ----------------Middlewares-----------------//
// to handle invalid page
// incase user goes to invalid url
app.use(notFound);

// custom error middleware
// midddleware is a function that
// has access to the request and response cycle objects
// when we make a request, middleware function can access anything in these objects
// You define error-handling middleware last, after other app.use() and routes calls; for example:
// https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path
app.use(errorHandler);

// setting port to listen for requests
const PORT = process.env.PORT || 5000;

// bind and listen the connections on the specified host and port
app.listen(PORT, () => {
  console.log("App now listening for requests on port 5000");
});
