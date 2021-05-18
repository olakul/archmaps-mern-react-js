
require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const session = require('express-session');
const MongoStore = require('connect-mongo');
const MONGODB_URI = 'mongodb://localhost/archmaps' || process.env.MONGODB_URI ;


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI
    })
  })
)

const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user._id);
})

// this is used to retrieve the user by it's id (that is stored in the session)
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(dbUser => {
      done(null, dbUser)
    })
    .catch(err => {
      done(err);
    })
})

passport.use(
  new LocalStrategy((username, password, done) => {
    // this logic will be executed when we log in
    User.findOne({ username: username })
      .then(userFromDB => {
        if (userFromDB === null) {
          // there is no user with this username
          done(null, false, { message: 'Wrong Credentials' });
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          // the password does not match
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          // everything correct - user should be logged in
          done(null, userFromDB);
        }
      })
      .catch(err => {
        next(err);
      })
  })
)

app.use(passport.initialize());
app.use(passport.session());

const projects = require("./routes/projects");
app.use("/api/landmarks", landmarks);

const auth = require("./routes/auth");
app.use("/api/auth", auth);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
