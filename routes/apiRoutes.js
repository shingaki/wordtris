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
            req.session.save();
            // res.json(response);
            res.json({
                loggedin: req.session.loggedin,
                playerName: req.session.playerName,
                userId: req.session.userId
            })
        })
    })

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
                req.session.save();
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
                attributes: ['PlayerId', 'playerWord', 'wordPoints', 'letterBonus', 'wordBonus', 'playerWordRanking'],
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
            // res.json("not logged in");
        }
    
    })

    // update player's highest scoring words in db
    app.put("/updateplayerbestwords", (req, res) => {
        console.log("updating player's highest scoring words")
        console.log(req.body.new);
        let responses = [];

        // update all player word positions
        for (let i = 1; i <= req.body.new.length; i++) {
            // find it
            db.PlayerWords.findOne({
                where: {
                    PlayerId: req.body.new[i - 1].PlayerId,
                    playerWordRanking: i
                }
            }).then(dbResponse => {
                console.log("PLAYER BEST WORDS HERE");
                console.log(dbResponse);
                // if this rank already exists, update it
                if (dbResponse !== null) {
                    db.PlayerWords.update({
                        playerWord: req.body.new[i - 1].playerWord,
                        wordPoints: req.body.new[i - 1].wordPoints,
                        letterBonus: req.body.new[i - 1].letterBonus,
                        wordBonus: req.body.new[i - 1].wordBonus,
                    }, {
                            where: {
                                PlayerId: req.body.new[i - 1].PlayerId,
                                playerWordRanking: i,
                            }
                    }).then((dbResponse) => {
                        console.log(dbResponse);
                        console.log("update player words");
                        responses.push(dbResponse);
                    }).catch(function (err) {
                        console.log(err);
                    });

                } else {
                    // if doesn't exist, create it
                    db.PlayerWords.create({
                        playerWordRanking: i,
                        PlayerId: req.body.new[i - 1].PlayerId,
                        playerWord: req.body.new[i - 1].playerWord,
                        wordPoints: req.body.new[i - 1].wordPoints,
                        letterBonus: req.body.new[i - 1].letterBonus,
                        wordBonus: req.body.new[i - 1].wordBonus,
                    }).then((dbResponse) => {
                        console.log(dbResponse);
                        console.log("update player words");
                        responses.push(dbResponse);
                    }).catch(function (err) {
                        console.log(err);
                    });

                }
            })
        }

        // update all positions
        // for (let i = 1; i <= req.body.new.length; i++) {
        //     db.PlayerWords.upsert({
        //         id: i,
        //         playerWord: req.body.new[i - 1].playerWord,
        //         wordPoints: req.body.new[i - 1].wordPoints,
        //         letterBonus: req.body.new[i - 1].letterBonus,
        //         wordBonus: req.body.new[i - 1].wordBonus,
        //         PlayerId: req.body.new[i - 1].PlayerId,
        //         playerWordRanking: i
        //     }, {
        //             where: {
        //                 // PlayerId: req.body.new[i - 1].PlayerId,
        //                 // playerWordRanking: i,
        //                 id: i
        //         }
        //     }).then((dbResponse) => {
        //         console.log(dbResponse);
        //         console.log("update player words");
        //         responses.push(dbResponse);
        //     }).catch(function (err) {
        //         console.log(err);
        //     });
        // }
        res.json(responses);

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
            // res.json("not logged in")
        }

    })


    // update player's highest scores in db
    app.put("/updateplayerhighestscores", (req, res) => {
        console.log("updating player's highest scores")
        let responses = [];

        // update all positions
        for (let i = 1; i <= req.body.new.length; i++) {
            // find it
            db.PlayerScores.findOne({
                where: {
                    PlayerId: req.body.new[i - 1].PlayerId,
                    playerScoreRanking: i,
                }
            }).then(dbResponse => {
                console.log("PLAYER BEST WORDS HERE");
                console.log(dbResponse);
                // if this rank already exists, update it
                if (dbResponse !== null) {
                    db.PlayerScores.update({
                        playerScore: req.body.new[i - 1].playerScore,
                    }, {
                            where: {
                                PlayerId: req.body.new[i - 1].PlayerId,
                                playerScoreRanking: i,
                            }
                    }).then((dbResponse) => {
                        console.log(dbResponse);
                        console.log("update player words");
                        responses.push(dbResponse);
                    }).catch(function (err) {
                        console.log(err);
                    });

                } else {
                    // if doesn't exist, create it
                    db.PlayerScores.create({
                        PlayerId: req.body.new[i - 1].PlayerId,
                        playerScoreRanking: i,
                        playerScore: req.body.new[i - 1].playerScore,
                    }).then((dbResponse) => {
                        console.log(dbResponse);
                        console.log("update player words");
                        responses.push(dbResponse);
                    }).catch(function (err) {
                        console.log(err);
                    });

                }
            })
        }









        // for (let i = 1; i <= req.body.new.length; i++) {
        //     db.PlayerScores.upsert({
        //         id: i,
        //         playerScore: req.body.new[i - 1].playerScore,
        //         playerScoreRanking: i,
        //         PlayerId: req.body.new[i - 1].PlayerId
        //     }, {
        //             where: {
        //                 // PlayerId: req.body.new[i - 1].PlayerId,
        //                 // playerWordRanking: i,
        //                 id: i
        //         }
        //     }).then((dbResponse) => {
        //         console.log(dbResponse);
        //         console.log("update player words");
        //         responses.push(dbResponse);
        //     }).catch(function (err) {
        //         console.log(err);
        //     });
        // }
        res.json(responses);
    })


    // get global high scores and respective players from db
    app.get("/getglobalhighscores", (req, res) => {
        console.log("getting global high scores!!!")

            db.HighestScores.findAll({
                attributes: ['scorePosition', 'highestScore', 'playerId'],
                include: [
                    {
                        model: db.Players,
                        attributes: ['playerName']
                    }
                ],
                order: [['scorePosition', 'ASC']],

            }).then((dbResponse) => {
                // console.log(dbResponse);
                res.send(dbResponse);
            }).catch(function (err) {
                console.log(err);
            })
        })


    // update global high scores
    app.put("/updateglobalhighscores", (req, res) => {
        console.log("updating global high scores")
        let responses = [];

        // update all positions
        for (let i = 1; i <= req.body.new.length; i++) {
            db.HighestScores.upsert({
                id: i,
                PlayerId: req.body.new[i - 1].playerId,
                highestScore: req.body.new[i - 1].score,
                scorePosition: i
            }, {
                    where: {
                        id: i
                    }
            }).then((dbResponse) => {
                console.log("global scores updated");
                responses.push(dbResponse);
            }).catch(function (err) {
                // res.send(err);
            });
        }
        res.json(responses);

    })

    // get global high words and respective players from db
    app.get("/getglobalhighwords", (req, res) => {
        console.log("getting global high words")

        db.HighestWords.findAll({
            attributes: ['scorePosition', 'highestWord', 'score', 'letterBonus', 'wordBonus', 'playerId'],
            include: [
                {
                    model: db.Players,
                    attributes: ['playerName']
                }
            ],
            order: [['scorePosition', 'ASC']],

        }).then((dbResponse) => {
            // console.log(dbResponse);
            res.send(dbResponse);
        }).catch(function (err) {
            console.log(err);
        })
    })

    // update global words (highest scoring)
    app.put("/updateglobalbestwords", (req, res) => {
        console.log("updating global words")
        // console.log(req.body)
        let responses = [];

        // update all positions
        for (let i = 1; i <= req.body.new.length; i++) {
            db.HighestWords.upsert({
                id: i,
                PlayerId: req.body.new[i - 1].playerId,
                highestWord: req.body.new[i - 1].word,
                score: req.body.new[i - 1].score,
                letterBonus: req.body.new[i - 1].letterBonus,
                wordBonus: req.body.new[i - 1].wordBonus,
                scorePosition: i
            }, {
                    where: {
                        id: i
                    }
            }).then((dbResponse) => {
                console.log("global words updated");
                responses.push(dbResponse);
            }).catch(function (err) {
                // res.send(err);
            });
        }
        res.json(responses);

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