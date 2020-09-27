require("dotenv").config();
// const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

const db = require("./models");
const NODEPORT  =  3001;

console.log("PORT" + process.env.PORT);
// Configure middleware
// Set up express to use this port
app.set("port", process.env.PORT || NODEPORT);
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

// Routes
require("./routes/apiRoutes")(app);

// Configure express to use public folder
app.use(express.static(path.join(__dirname, "public")));

// If false, table won't be dropped everytime you start the server. 
// Otherwise it would.

var syncOptions = { force: false};

// Starting the server, syncing our models-----/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(NODEPORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        NODEPORT,
        NODEPORT
      );
    });
  });
  
  module.exports = app;

