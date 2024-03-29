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
  updateUserDetails,
  updatePassword,
  getAllUsersInfo,
  updateUser,
  addAddress,
  editAddress,
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

// to update user details (by user itself)
router.put("/info", auth, updateUserDetails);

// Address Add / Edit
router.post("/address", auth, addAddress);
router.put("/address/:id", auth, editAddress);

// to update password
router.put("/updatePassword", auth, updatePassword);

/////////////////////////////////////////
// Admin
// To get all users list
router.get("/allUsersInfo", auth, authAdmin, getAllUsersInfo);

// To edit user (By admin)
router.put("/:id", auth, authAdmin, updateUser);

export default router;
