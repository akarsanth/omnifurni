import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sendMail from "./sendMail.js";

// Database
import db from "../models/index.js";
const User = db.user;
const Sequelize = db.Sequelize;

// @desc    Add new user
// @route   POST /api/v1/auth/register
// @access  Public (anything can hit it)
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

// @desc    To activate user
// @route   POST /api/v1/auth/activation
// @access  Public (anything can hit it)
// called from email http://localhost:3000/user/activate/:activationToken
const activateEmail = asyncHandler(async (req, res) => {
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
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    For Login
// @route   POST /api/v1/auth/login
// @access  Public
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

// @desc    Get Access Token
// @route   POST /api/v1/auth/refreshToken
// @access  Public (anything can hit it)
// to get access token from cookies
// refresh token is set in cookie
// in every refresh of the page
// a call is made to get the access token
// so that the access token can be used
// to access protected routes
const getAccessToken = asyncHandler(async (req, res) => {
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
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    To handle forgot password
// @route   POST /api/v1/auth/forgot
// @access  Public (anything can hit it)
const forgotPassword = asyncHandler(async (req, res) => {
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
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Reset Password
// @route   POST /api/v1/auth/reset
// @access  Public (anything can hit it)
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
    res.status(500);
    throw new Error(err.message);
  }
};

// @desc    To get user info
// @route   POST /api/v1/auth/info
// @access  Protected
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    res.json(user);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// @desc    Reset Password
// @route   POST /api/v1/auth/reset
// @access  Public (anything can hit it)
const updateUserDetails = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, contactNumber } = req.body;

    const user = await User.findByPk(req.user.id);

    if (user) {
      user.first_name = firstName || user.first_name;
      user.last_name = lastName || user.last_name;
      user.contact_number = contactNumber || user.contact_number;

      await user.save();
    }

    res.json({ message: "User details updated successfully" });
  } catch (err) {
    res.status(500);
    throw new Error(
      "User details could not be updated at this moment. Try again!"
    );
  }
});

// @desc    Reset Password
// @route   POST /api/v1/auth/reset
// @access  Public (anything can hit it)
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    // const user = await User.findByPk(req.user.id, {
    //   attributes: ["password"],
    // });

    const user = await User.findByPk(req.user.id);

    // Checking if current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      res.status(400);
      throw new Error("Current password does not match!");
    }

    // If password is valid
    // Hashing new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Updating password
    user.password = hashedNewPassword;

    await user.save();

    res.json({ message: "Password Updated Successfully!" });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    To get all users info
// @route   POST /api/v1/auth/allUsersInfo
// @access  Protected (auth + admin)
const getAllUsersInfo = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },

      where: {
        user_id: {
          [Sequelize.Op.ne]: req.user.id,
        },
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

// @desc    To edit users info
// @route   POST /api/v1/auth/allUsersInfo
// @access  Protected (auth + admin)
const editUser = asyncHandler(async (req, res) => {
  try {
    const { userId, firstName, lastName, role } = req.body;

    console.log("============================");
    console.log(req.body);
    console.log("============================");

    const user = await User.findByPk(userId);

    if (user) {
      user.first_name = firstName || user.first_name;
      user.last_name = lastName || user.last_name;
      user.role = role;
    }

    console.log("---------------------------");
    console.log(user);
    console.log("---------------------------");

    const updatedUser = await user.save();

    res.json({
      message: "User details updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(500);
    throw new Error(
      "User details could not be updated at this moment. Try again!"
    );
  }
});

//////////////////////////////////
// logout
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshToken" });
    return res.json({ msg: "Logged out!" });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
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
  updateUserDetails,
  updatePassword,
  getAllUsersInfo,
  editUser,
};
