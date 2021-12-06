import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models/index.js";
const User = db.user;

// registration process
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, contactNumber, email, password } = req.body;

  const userAlreadyExists = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  // if user already exists
  if (userAlreadyExists) {
    // this response can be accessed from front end HTTP request
    // will be handled by the custom error handler middleware
    res.status(400);
    throw new Error("User already exists!");

    // return res.json({ message: "User with email already exists!" });
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  // user object
  const user = {
    first_name: firstName,
    last_name: lastName,
    contact_number: contactNumber,
    email: email,
    password: hashedPassword,
  };

  // creating new user
  const savedUser = await User.create(user).catch((err) => {
    console.log("Error: ", err);
    // internal server error status code
    res.status(500);
    throw new Error("Cannot register user at the moment!");
  });

  if (savedUser) res.json({ message: "User Registered Successfully!" });
});

// normal user login process
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } }).catch((err) => {
    console.log("Error: ", err);
  });

  // if user not found
  if (!user) {
    res.status(400);
    throw new Error(`User '${email}' not found!`);
  }

  // if user is found
  // checking if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Email or password does not match!");
  }

  // generating jwt token
  const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.cookie("token", jwtToken);
  // .json({ userInfo: user });
  // .json({ token: jwtToken });
});

export { registerUser, loginUser };
