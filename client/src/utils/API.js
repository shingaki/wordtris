import axios from "axios";

export default {
    // check that new user's username isn't taken
    checkUsername: function (username) {
        var checkUsername = {
            username: username,
        }

        console.log("make post request to make sure username isn't already taken")
        return axios.post("/api/users/new", checkUsername);
    },
    
    // create user from sign up form
    createUser: function (username, email, password) {
        var newUser = {
            username: username,
            email: email,
            password: password
        }

        console.log("make post request with new user info")
        return axios.post("/api/users/new", newUser);
    },

    // check user's login credentials
    loginUser: function (username, password) {
        var checkUser = {
            username: username,
            password: password
        }

        console.log("make post request to check user validity")
        return axios.post("/api/users", checkUser);
    }
}