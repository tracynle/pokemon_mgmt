require("dotenv").config();
// const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

const db = require("./models");
const NODEPORT  =  3001;
console.log(`process.env.NODE_ENV ==>> ${process.env.NODE_ENV}`);
console.log("PORT" + process.env.PORT);
// Configure middleware
// Set up express to use this port
const PORT = process.env.PORT || NODEPORT;
app.set("port", PORT);
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

// Routes
require("./routes/apiRoutes")(app);
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


// Configure express to use public folder
app.use(express.static(path.join(__dirname, "public")));

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// If false, table won't be dropped everytime you start the server. 
// Otherwise it would.

var syncOptions = { force: false};

// Starting the server, syncing our models-----/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });
  
  module.exports = app;

