const getUserById = require("./getUserById");
const getUserLocation = require("./getUserLocation");
const handleLogin = require("./handleLogin");
const handleLogout = require("./handleLogout");
const handleRegister = require("./handleRegister");
const refreshToken = require("./refreshToken");
const updatePassword = require("./updatePassword");
const updateUsername = require("./updateUsername");

module.exports = {
    getUserById,
    getUserLocation,
    handleLogin,
    handleLogout,
    handleRegister,
    refreshToken,
    updatePassword,
    updateUsername
}