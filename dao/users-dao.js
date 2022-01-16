const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function login(user) {
    let sql = "SELECT * FROM users where username =? and password =?";
    let parameters = [user.username, user.password];

    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }

    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return usersLoginResult[0];


}

async function addUser(user) {
    let sql = "INSERT INTO users (username, password)  values(?, ?)";
    let parameters = [user.username, user.password];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {

        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}


async function isUserExistByName(name) {
    let sql = "SELECT * FROM users where username =?";
    let parameters = [name];
    let result;
   
    try {
      result =  await connection.executeWithParameters(sql, parameters);
      console.log(result)
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
    return result;
}


module.exports = {
    login,
    addUser,
    isUserExistByName
}


