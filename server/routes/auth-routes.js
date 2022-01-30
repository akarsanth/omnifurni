import express from "express";
const router = express.Router();

import {
  registerUser,
  activateEmail,
  loginUser,
  logout,
  getAccessToken,
  forgotPassword,
  resetPassword,
  getUserInfo,
  getAllUsersInfo,
} from "../controllers/user-controllers.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

// auth middleware
// to check if user is authenticated
// to get user data
// import { isUserAuthenticated } from "../middlewares/auth.js";

// normal user login
router.post("/register", registerUser);
router.post("/activation", activateEmail);

// refresh token is set in loginUser
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/refreshToken", getAccessToken);

// forget and reset
router.post("/forgot", forgotPassword);

// access token and password will be passed
// password as body
// access token as authorization header
router.post("/reset", auth, resetPassword);

// get user info
router.get("/info", auth, getUserInfo);
router.get("/allUsersInfo", auth, authAdmin, getAllUsersInfo);

export default router;
