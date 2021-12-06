import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";

import { registerUser, loginUser } from "../controllers/user-controllers.js";

// auth middleware
// to check if user is authenticated
// to get user data
// import { isUserAuthenticated } from "../middlewares/auth.js";

// normal user login
router.post("/register", registerUser);
router.post("/login", loginUser);

// login with google
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback route for google to redirect to
// after user allows the permission
// passport.authenticate("google") takes the callback profile code
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    // failureRedirect: errorLoginUrl,
    // successRedirect: successLoginUrl,
  }),
  (req, res) => {
    // // user comes from deserialize
    // console.log("User: ", req.user);
    // res.send("Thank you for signing in");

    // generating jwt token
    const jwtToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res
      // .cookie("token", jwtToken)
      // .json({ userInfo: user });
      .json({ token: jwtToken });
  }
);

// to get user data
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// google login

export default router;
