/*
FOR NORMAL USER REGISTRATION AND LOGION
*/

import express from "express";
const router = express.Router();

import passport from "passport";

import { registerUser, loginUser } from "../controllers/user-controllers.js";

// auth middleware
// to check if user is authenticated
// to get user data
import { isUserAuthenticated } from "../middlewares/auth.js";

// normal user login
router.post("/register", registerUser);
router.post("/login", loginUser);

// to get user data
// router.get("/user", isUserAuthenticated, (req, res) => {
//   res.json(req.user);
// });

// normal user
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// to get user data
// google user
router.get("/user/google", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

// google login

export default router;
