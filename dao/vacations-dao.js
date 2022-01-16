const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error")

async function getVacations() {

    let sql = "SELECT * FROM vacations"
    try {
        let vacations = await connection.executeWithParameters(sql);
        return vacations;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function addVacation(vacationDetails) {
    let sql = "INSERT INTO vacations (destination, image, dates, price, number_of_followers)  values(?, ?, ?, ?, ?)";
    let parameters = [vacationDetails.destination, vacationDetails.image, vacationDetails.dates, vacationDetails.price, vacationDetails.number_of_followers];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationDetails), e);
    }
}


async function updateVacation(vacationDetails) {
    let sql = "UPDATE vacations.vacations SET destination=?, image=?, dates=?, price=? WHERE vacationId =?";

    let parameters = [vacationDetails.destination, vacationDetails.image, vacationDetails.dates, vacationDetails.price, vacationDetails.vacationId];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationDetails), e);
    }
}


async function deleteVacation(vacationId) {
    let sql = "DELETE FROM `vacations`.`vacations` WHERE (`vacationId` = ?)";
    let parameters = [vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, vacationId, e);
    }
}

async function getAllVacationsJoinToUserFollowedVacations(userId) {
    let sql = "select v.*, case when fv.vacationId is null then false else true end as isUserFollow  from vacations v left join followed_vacations fv on fv.userId =?  and v.vacationId = fv.vacationId";
    let parameters = [userId];
    try {
       let vacations = await connection.executeWithParameters(sql, parameters);
       return vacations;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}


module.exports = {
    addVacation,
    deleteVacation,
    getVacations,
    updateVacation,
    getAllVacationsJoinToUserFollowedVacations
}


