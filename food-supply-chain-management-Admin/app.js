const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require("morgan")
const moment = require("moment")
const open = require('opn');
const path = require("path")

const app = express();
app.use(morgan('dev'))

require("dotenv").config()

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
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
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/tomatoes',require("./routes/tomato"))
app.use("/insights",require("./routes/insights"))
app.use("/distribution",require("./routes/distribution"))
app.use("/transport",require("./routes/transport"))


// Routes
require("./config/googleAuth")


app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login'
  })
);

require("./DBadmin")

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    // open(`http://localhost:${PORT}`);
    console.log(`server running on port ${PORT}`);
    
});
  