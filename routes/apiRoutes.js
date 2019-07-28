require("dotenv").config();
const axios = require("axios");
const db = require("../models");
const path = require("path");
const trie = require("./myTrie");

module.exports = function(app) {
    app.get("/checkWord", (req, res) => {

       if (myTrie.hasWord(wordToCheck)) {
           return true;
        } else {
           return false;
       }
        }
    )

}