const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addFollowedVacation(userId, followedVacationId) {
    let sql = "INSERT INTO followed_vacations (userId, vacationId)  values(?, ?)";
    let parameters = [userId, followedVacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(followedVacation), e);
    }
}


async function deleteUserFollowedVacation(userId, vacationId) {
    let sql = "DELETE FROM followed_vacations WHERE (`userId` = ?) and (`vacationId` = ?)";
    let parameters = [userId, vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}


async function getUserFollowedVacations(userId) {
    let sql = "SELECT `vacationId` FROM followed_vacations WHERE  (`userId` = ?)";
    let parameters = [userId];
    try {
        let userFollowedVacations = await connection.executeWithParameters(sql, parameters);
        return userFollowedVacations;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}


async function getAllFollowedVacations() {
    let sql = "SELECT vacationId, count(*) as numberOfFollowers FROM followed_vacations group by vacationId";

    try {
        let allFollowedVacations = await connection.executeWithParameters(sql);
        return allFollowedVacations;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}


async function deleteFollowedVacation(vacationId) {
    let sql = "DELETE FROM followed_vacations WHERE (`vacationId` = ?)";
    let parameters = [vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}


module.exports = {
    addFollowedVacation,
    deleteUserFollowedVacation,
    getUserFollowedVacations,
    getAllFollowedVacations,
    deleteFollowedVacation
}