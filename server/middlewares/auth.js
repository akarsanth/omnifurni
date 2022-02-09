import jwt from "jsonwebtoken";

// t0 handle possible exceptions
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  let token;

  // if authorization header is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // verifying the token

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error)
          return res.status(400).json({ msg: "Invalid Authentication." });

        req.user = user;

        next();
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default auth;

// try {
//   const token = req.header("Authorization");
//   if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(400).json({ msg: "Invalid Authentication." });

//     req.user = user;

//     next();
//   });
// } catch (err) {
//   return res.status(500).json({ msg: err.message });
// }
