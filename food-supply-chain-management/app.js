const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const moment = require("moment");
const path = require("path")

const app = express();
app.use(morgan("dev"));

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// EJS

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join((__dirname + '/views'))));
//app.use(express.static(path.join(__dirname, 'public')));


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});



// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/tomatoes", require("./routes/tomato"));
app.use("/insights", require("./routes/insights"));
app.use("/trade", require("./routes/trade"));
app.use("/requests", require("./routes/myRequests"));
app.use("/distribute",require("./routes/myDistributions"))
app.use("/transport",require("./routes/transport"))

app.use('/shutdown', (req, res) => {
  console.log('Server is shutting down...');
  res.status(200).send('Shutting down...');
  server.close(() => {
      console.log('Server has been shut down.');
      process.exit(0); // Exit the Node.js application
  });
});

require("./DBadmin");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`Server running on  ${PORT}`));
