import passport from "passport";
import passportJWT from "passport-jwt";
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

// import { keys } from "./keys.js";

console.log("In passwort jwt");

import db from "../models/index.js";
const User = db.user;

// passport jwt
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      console.log("inside passport");
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, null);
        });
    }
  )
);

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// passport.serializeUser((user, done) => {
//   // error and id
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // error and id
//   User.findByPk(id).then((user) => {
//     done(null, user);
//   });
// });

// // just like express middleware
// // use
// // strategy and callback function
// passport.use(
//   new GoogleStrategy(
//     {
//       // options for the Google Strategy
//       // redirect url after user clicks the
//       // allow button on consent screen
//       callbackURL: "/auth/google/redirect",
//       clientID: keys.google.clientID,
//       clientSecret: keys.google.clientSecret,
//     },

//     async (accessToken, refreshToken, profile, done) => {
//       // this callback function will fire at
//       // some time during the authent process
//       // profile returned by google
//       // console.log(profile);

//       // checking if user already exists in db
//       User.findOne({
//         where: {
//           googleId: profile.id,
//         },
//       }).then((currentUser) => {
//         if (currentUser) {
//           // already have the user
//           console.log("User is: ", currentUser);
//           done(null, currentUser);
//         } else {
//           // if not create user in db
//           // creating and adding user to db
//           const user = {
//             username: profile.displayName,
//             googleId: profile.id,
//           };

//           User.create(user).then((newUser) => {
//             console.log("New user created: ", newUser.toJSON());
//           });

//           done(null, newUser);
//         }
//       });
//     }
//   )
// );
