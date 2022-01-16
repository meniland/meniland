const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require("../config.json");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";


async function login(userDetails) {

    userDetails.password = crypto.createHash("md5").update(saltLeft + userDetails.password + saltRight).digest("hex");

    let userLoginData = await usersDao.login(userDetails);

    const token = jwt.sign({
        userId: userLoginData.userId,
        usertype: userLoginData.usertype,
        username: userLoginData.username
    }, config.secret);
    return { token: token, userDetails: { usertype: userLoginData.usertype, username: userLoginData.username, userId: userLoginData.userId } };
}


async function addUser(userDetails) {
    validateUserData(userDetails);
    let usernameFromDb = await usersDao.isUserExistByName(userDetails.username);
    if (usernameFromDb.length != 0) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    userDetails.password = crypto.createHash("md5").update(saltLeft + userDetails.password + saltRight).digest("hex");
    await usersDao.addUser(userDetails);
}


function validateUserData(userDetails) {
    if (!userDetails.password) {
        throw new Error();
    }

    if (!userDetails.username) {
        throw new Error();
    }
}


module.exports = {
    login,
    addUser
}
