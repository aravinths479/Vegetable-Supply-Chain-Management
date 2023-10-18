const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");
const AdminUser = require("../models/AdminUser"); // User model schema

const GOOGLE_CLIENT_ID = "1055841012033-hqc65uvrphpmhh5rc6drtfg3icfd9q9l.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const CALL_BACK_URL = "http://127.0.0.1:4000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALL_BACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const userExists = await AdminUser.findOne({ email: profile.emails[0].value });
      if (userExists) {
        // If user exists, return user object
        return done(null, userExists);
      }
      // If user does not exist, create new user object
      const newUser = new AdminUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: "dsxfghyugdgfhjiokfdzxf",
      });
      // Save new user object to database
      await newUser.save();
      // Return new user object
      return done(null, newUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
