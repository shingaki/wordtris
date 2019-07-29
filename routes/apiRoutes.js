// require("dotenv").config();
// const axios = require("axios");
const db = require("../models");
const path = require("path");
// const trie = require("./myTrie");

module.exports = function(app) {
    // app.get("/checkWord", (req, res) => {

    //    if (myTrie.hasWord(wordToCheck)) {
    //        return true;
    //     } else {
    //        return false;
    //    }
    //     }
    // )

    // check if playerName is taken
    app.post("/api/playername", (req, res) => {
        db.Players.findOne({
            where: {
                playerName: req.body.playerName
            }
        }).then(dbResponse => {
            console.log(dbResponse);
            if (dbResponse === null) {
                res.json({
                    playerName: "available"
                })
            } else {
                res.json({
                    playerName: "taken"
                })
            }
        })
    })

    // sign up new player
    app.post("/api/players/new", (req, res) => {
        db.Players.create({
            playerName: req.body.playerName,
            email: req.body.email,
            password: req.body.password
        }).then(response => {
            req.session.loggedin = true;
            req.session.playerName = req.body.playerName;
            // res.json(response);
            res.json({
                loggedin: req.session.loggedin,
                playerName: req.session.playerName
            })
        })
    })

    // auto login for dev purposes
    app.get("/auto-login", function (req, res) {
        req.session.loggedin = true;
        req.session.playerName = "jpaul";
        res.json({
            loggedin: req.session.loggedin,
            playerName: req.session.playerName
        });
    });

    // log player in
    app.post("/login", (req, res) => {
        console.log("req body")
        console.log(req.body)
        db.Players.findOne({
            where: {
                playerName: req.body.playerName,
                password: req.body.password
            }
        }).then(dbResponse => {
            console.log(dbResponse);
            // if player with those credentials is found
            if (dbResponse !== null) {
                // log them in
                console.log("loggin in....")
                req.session.loggedin = true;
                req.session.playerName = dbResponse.dataValues.playerName;
                res.json({
                    loggedin: req.session.loggedin,
                    playerName: req.session.playerName
                })

            } else {
                console.log("rejected login")
                res.json(false);
            }
        })

    })

    // check if player is logged in
    app.get("/isloggedin", (req, res) => {
        if (req.session.loggedin) {
            res.json({
                loggedin: req.session.loggedin,
                playerName: req.session.playerName
            })
        } else {
            res.json({
                loggedin: false
            })
        }
    })

    // logout
    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });

}