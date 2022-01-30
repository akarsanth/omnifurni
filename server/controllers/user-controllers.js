import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sendMail from "./sendMail.js";

// Database
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
    throw new Error(`User '${email}' already exists!`);

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

  // activation token
  // user data is embedded in the activation token
  const activationToken = createActivationToken(user);

  // URL for the email to be sent
  const activationURL = `http://localhost:3000/user/activate/${activationToken}`;
  // send mail with the activation URL
  sendMail(email, activationURL, "Verify your email address");

  res.json({
    message: `Please check your email "${email}" account for verification link to activate your account!`,
  });

  // // creating new user
  // const savedUser = await User.create(user).catch((err) => {
  //   console.log("Error: ", err);
  //   // internal server error status code
  //   res.status(500);
  //   throw new Error("Cannot register user at the moment!");
  // });

  // if (savedUser) res.json({ message: "User Registered Successfully!" });
});

// called from email http://localhost:3000/user/activate/:activationToken
const activateEmail = async (req, res) => {
  try {
    const { activationToken } = req.body;

    // verifying the token with activation token key
    const user = jwt.verify(
      activationToken,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { email } = user;

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

    const savedUser = await User.create(user).catch((err) => {
      console.log("Error: ", err);
      // internal server error status code
      res.status(500);
      throw new Error("Cannot register user at the moment!");
    });

    if (savedUser) res.json({ message: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

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

  // checking if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // if password is valid
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Email or password does not match!");
  }

  const refreshToken = createRefreshToken({ id: user.user_id });

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    // path to get refresh token
    path: "/api/v1/auth/refreshToken",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.json({ message: "Login success!" });
});

// to get access token from cookies
// refresh token is set in cookie
// in every refresh of the page
// a call is made to get the access token
// so that the access token can be used
// to access protected routes
const getAccessToken = (req, res) => {
  try {
    // accesssing refresh token from cookie
    const refreshToken = req.cookies.refreshtoken;

    // if there is no refresh token
    if (!refreshToken)
      return res.status(400).json({ msg: "Please login now!" });

    // if there is refresh token
    // verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please login now!" });

      // create access token
      const accessToken = createAccessToken({ id: user.id });
      res.json({ accessToken });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

///////////////////////////////////
// forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } }).catch((err) => {
      console.log("Error: ", err);
    });

    // if user does not exist
    if (!user) {
      // this response can be accessed from front end HTTP request
      // will be handled by the custom error handler middleware
      res.status(400);
      throw new Error("This email does not exist!");

      // return res.json({ message: "User with email already exists!" });
    }

    // if user exists
    const accessToken = createAccessToken({ id: user.id });
    const url = `http://localhost:3000/user/reset/${accessToken}`;

    sendMail(email, url, "Reset your password");
    res.json({
      message: `Please check your email ${email} for email verification!`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    console.log(password);
    const passwordHash = await bcrypt.hash(password, 12);

    await User.update(
      {
        password: passwordHash,
      },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAllUsersInfo = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    res.json(users);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//////////////////////////////////
// logout
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshToken" });
    return res.json({ msg: "Logged out!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//////////////////////////////////
// activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export {
  registerUser,
  activateEmail,
  loginUser,
  logout,
  getAccessToken,
  forgotPassword,
  resetPassword,
  getUserInfo,
  getAllUsersInfo,
};
