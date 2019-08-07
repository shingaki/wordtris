// require("dotenv").config();
// const axios = require("axios");
const db = require("../models");
const path = require("path");
var myTest = require('../server.js')
// var trie = require('trie-prefix-tree');
// const fs = require("fs");



module.exports = function(app) {

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
            console.log(response);
            req.session.loggedin = true;
            req.session.playerName = req.body.playerName;
            req.session.userId = response.dataValues.id;
            // res.json(response);
            res.json({
                loggedin: req.session.loggedin,
                playerName: req.session.playerName,
                userId: req.session.userId
            })
        })
    })

    // auto login for dev purposes
    app.get("/auto-login", (req, res) => {
        req.session.loggedin = true;
        req.session.playerName = "jpaul";
        req.session.userId = 1;
        res.json({
            loggedin: req.session.loggedin,
            playerName: req.session.playerName,
            userId: req.session.userId
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
                console.log("logging in....")
                req.session.loggedin = true;
                req.session.playerName = dbResponse.dataValues.playerName;
                req.session.userId = dbResponse.dataValues.id;
                res.json({
                    loggedin: req.session.loggedin,
                    playerName: req.session.playerName,
                    userId: req.session.userId
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
                playerName: req.session.playerName,
                userId: req.session.userId
            })
        } else {
            res.json({
                loggedin: false
            })
        }
    })

    // logout
    app.get("/logout", (req, res) => {
        req.session.destroy(err => {
            res.redirect("/");
        });
    });

    // get players words and scores from db
    app.get("/getplayerswords", (req, res) => {

        if (req.session.loggedin) {
            console.log("getting players words and scores!!!")

            db.PlayerWords.findAll({
                attributes: ['PlayerId', 'playerWord', 'wordPoints', 'playerWordRanking'],
                    where: {
                        PlayerId: req.session.userId,
                    },
                order: [ ['wordPoints', 'DESC'],],
            }).then(dbResponse => {
                // console.log(dbResponse);
                res.json(dbResponse);
            })
        } else {
            console.log("not logged in")
        }
    
    })

    // get players highest scores from db
    app.get("/getplayershighestscores", (req, res) => {

        if (req.session.loggedin) {
            console.log("getting players highest scores!!!")
            db.PlayerScores.findAll({
                attributes: ['PlayerId', 'playerScore', 'playerScoreRanking'],
                where: {
                    PlayerId: req.session.userId,
                },
                order: [ ['playerScore', 'DESC'],],
            }).then(dbResponse => {
                // console.log(dbResponse);
                res.json(dbResponse);
            })
        } else {
            console.log("not logged in")
        }

    })


    // get global high scores and respective players from db
    app.get("/getglobalhighscores", (req, res) => {
        console.log("getting global high scores!!!")

            db.HighestScores.findAll({
                attributes: ['scorePosition', 'highestScore'],
                include: [
                    {
                        model: db.Players,
                        attributes: ['playerName']
                    }
                ],
                order: [['scorePosition', 'ASC']],

            }).then((dbResponse) => {
                console.log(dbResponse);
                res.send(dbResponse);
            }).catch(function (err) {
                res.send(err);
            })
        })

    // get global high words and respective players from db
    app.get("/getglobalhighwords", (req, res) => {
        console.log("getting global high words!!!")

        db.HighestWords.findAll({
            attributes: ['scorePosition', 'highestWord'],
            include: [
                {
                    model: db.Players,
                    attributes: ['playerName']
                }
            ],
            order: [['scorePosition', 'ASC']],

        }).then((dbResponse) => {
            console.log(dbResponse);
            res.send(dbResponse);
        }).catch(function (err) {
            res.send(err);
        })
    })


    // check if word is valid
    app.post("/verifyword", (req, res) => {
        // console.log("req body");
        // console.log(req.body)
        var word = req.body.word;
        // console.log(word);

        if (myTest.myTrie.hasWord(word)) {
            // console.log("word exists")
            res.json(true);
        } else {
            // console.log("word does not exist")
            res.json(false);
        }

        // console.log(word);
        // Setup dictionary of words into the Trie


    });

}