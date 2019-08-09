import axios from "axios";

export default {
    // check that new player's playerName isn't taken
    checkPlayerName: function (playerName) {
        var checkPlayerName = {
            playerName: playerName,
        }

        console.log("make post request to make sure playerName isn't already taken")
        return axios.post("/api/playername", checkPlayerName);
    },
    
    // create player from sign up form
    createPlayer: function (playerName, email, password) {
        var newPlayer = {
            playerName: playerName,
            email: email,
            password: password
        }

        console.log("make post request with new player info")
        return axios.post("/api/players/new", newPlayer);
    },

    // login: check player's login credentials
    loginPlayer: function (playerName, password) {
        var checkPlayerName = {
            playerName: playerName,
            password: password
        }

        console.log("make post request to check player validity")
        return axios.post("/login", checkPlayerName);
    },

    getPlayersWordsAndScores: function () {
        return axios.get("/getplayerswords");
    },

    getPlayersHighestScores: function () {
        return axios.get("/getplayershighestscores");
    },

    getGlobalHighScores: function () {
        console.log("make get request to get global scores");
        return axios.get("/getglobalhighscores");
    },

    updateGlobalHighScores: function (newScores) {
        console.log("put request to update global high scores");
        return axios.put("/updateglobalhighscores", {
            new: newScores
        });
    },

    getGlobalHighWords: function () {
        console.log("make get request to get global words");
        return axios.get("/getglobalhighwords");
    },

    // checkWord: Check if it is a word
    checkWord: function (word) {

        var checkThisWord = {
            word: word
        };
        // console.log(checkThisWord);

        // console.log("make post request to check word")
        return axios.post("/verifyword", checkThisWord);
    },

}