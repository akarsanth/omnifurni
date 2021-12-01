// importing dependencies
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";

// importing error middlewares
import { notFound, errorHandler } from "./middlewares/error-middlewares.js";

// reading environmetal variable file
import dotenv from "dotenv";
dotenv.config();

// db connection from index.js file
import db from "./models/index.js";

import("./config/passportJWT-setup.js");
// import("./config/passportGoogle-setup.js");

// create app through express
const app = express();

// parse requests of content-type - application/json
// to handle HTTP POST POST requests
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// morgan, helmet and cors
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["hello"],
  })
);

// --------------- PASSPORT SETUP ---------------------//
// passport. initialize() is a middle-ware that initialises Passport
app.use(passport.initialize());
/* 
passport. session() acts as a middleware to alter the req object
and change the 'user' value that is currently the session id 
(from the client cookie) into the true deserialized user object.
*/
app.use(passport.session());

// create home route
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// setting up api
import api from "./routes/index.js";
app.use("/api/v1", api);

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
