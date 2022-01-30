import passport from "passport";
import passportGoogle from "passport-google-oauth20";

const GoogleStrategy = passportGoogle.Strategy;

import db from "../models/index.js";
const User = db.user;

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const defaultUser = {
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        // picture: profile.photos[0].value,
        googleId: profile.id,
      };

      // find or create
      const user = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("Error signing up", err);
        done(err, false);
      });

      if (user && user[0]) return done(null, user && user[0]);
    }
  )
);

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser((user, done) => {
  // this function creates an cookie
  // and the cookie will have an id
  // embedded in to it (user id)

  console.log("......................................................");
  console.log("Serializing user: ", user);
  console.log("......................................................");

  // error and id
  done(null, user.id);
});

// deserialize user takes an id
// when the browser sends the cookie back
// and we receive the id and find the user
passport.deserializeUser(async (id, done) => {
  // error and id
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log("Error deserializing", err);
    done(err, null);
  });

  console.log("Deserializing user ", user);

  // the user property is attached to
  // the req object and can be accessed
  // anywhere in the application
  if (user) done(null, user);
});

// important source
// https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed