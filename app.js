const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSession = require("express-session");
// Import Passport strategy for User Authen
const passport = require("passport");
const LocalStrategy = require("passport-local");


const dotenv = require("dotenv");
const flash = require("connect-flash")

// Import Database Models
const Workout = require("./models/Workout")
const User = require("./models/User")
const Exercise = require("./models/Exercise")

// Import routes
const routes = require("./routes");

dotenv.config();

const app = express();
app.use( bodyParser.json() );       
app.use( bodyParser.urlencoded() ); 

app.use(
  expressSession({
    secret: "secretKey",
    resave: false,
    saveUnitialized: false 
  })
)


// Setup passport for authentification
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ----------------------------------------------------------------
// Middleware
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static("public"))

app.use(flash());

// Connect to Swolemeter's MongoDB Cluster

// const serverAddress = 'mongo:27017'
// const databaseAddress = 'swole-meter'

mongoose.connect(
  "mongodb://localhost/swole-meter",
  { useNewUrlParser: true ,useUnifiedTopology: true}
)
.then(() => { console.log("[SERVERINFO]\nMONGOOSE CONNECTION SUCCESSFUL\n") })
.catch(() => { console.log("[SERVERINFO]\n MONGOOSE CONNECTION FAILED\n") })


// ----------------------------------------------------------------
// Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.login = req.isAuthenticated();
  res.locals.error = req.flash("error");
  req.locals.success = req.flash("success");

  next();
})

app.use("/api", ...routes);

// Standard Port
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {  
  console.log("App is running on port: " + PORT);
});



