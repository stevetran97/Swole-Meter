const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require('./config');
const cors = require('cors');

// Connect to Mongoose database and load models
require('./server/models').connect(config.dbUri);

const app = express();

// ----------------------------------------------------------------
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// ----------------------------------------------------------------


// Load static files at following directories
app.use(express.static("public"));

// Tell app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }))
// Tell app to parse JSON
app.use(bodyParser.json() );       
app.use(bodyParser.urlencoded() ); 

// Setup passport for authentification
app.use(passport.initialize());

// Load Passport Authentication Strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Assign auth-check middleware to run before protected api routes.
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Import routes
const authRoutes = require("./server/routes/auth");
const apiRoutes = require("./server/routes/api");
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Set port and listen on server
app.set('port', (process.env.PORT || config.backendPort));

app.listen(app.get('port'), () => {  
  console.log("App is running on port: " + app.get('port'));
});



