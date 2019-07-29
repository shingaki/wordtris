const express = require("express");
var session = require("express-session");
const path = require("path");
var trie = require('trie-prefix-tree');
const fs = require("fs");
const apiRoutes = require("./routes/apiRoutes");
var db = require("./models");
const app = express();
const PORT = process.env.PORT || 3001;


// SESSION SETUP
var sess = {
  secret: "wordTris",
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
apiRoutes(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });

  // for testing
  db.Players.create({
    playerName: "jpaul",
    password: "1234",
    email: "j@test.com"
  }).then(function (db) {
    // console.log(db);
  });
});



// Setup dictionary of words into the Trie
let data = fs.readFileSync('dictionary.txt');

// put the words into an array
wordsArray = data.toString().split("\r\n");
console.log(wordsArray);

// put the words into the trie
var myTrie = trie(wordsArray);

// if (myTrie.hasWord('catabases'))
// {
//   console.log("exists");
// } else { console.log("does not exist")}
// ;
//
module.exports.myTrie = myTrie;


