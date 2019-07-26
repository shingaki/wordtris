import axios from "axios";

export default {
    // create user from sign up form
    createUser: function (username, email, password) {
        var newUser = {
            username: username,
            email: email,
            password: password
        }

        console.log("make post request with new user info")
        return axios.post("/api/users", newUser);
    }
}