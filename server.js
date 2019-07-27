const express = require("express");
const path = require("path");
const trie = require('trie-prefix-tree');
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
var session = require("express-session");

// SESSION SETUP
var sess = {
  secret: "the bracket battle",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
};

app.use(session(sess));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
// test api route - used to check if user is logged in
app.get("/isloggedin", (req, res) => {
  req.session.loggedin = true;
  req.session.username = "testUser";
  if (req.session.loggedin) {
    res.json({
      loggedin: req.session.loggedin,
      username: req.session.username
    })
  } else {
    res.json({
      loggedin: req.session.loggedin
    })
  }
})

// logout
app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


// Setup dictionary of words into the Trie

let data = fs.readFileSync('dictionary.txt');

// put the words into an array
wordsArray = data.toString().split("\r\n");
console.log(wordsArray);

// put the words into the trie
var myTrie = trie(wordsArray);

module.exports = myTrie;


