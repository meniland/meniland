const followedVacationsDao = require("../dao/followed_vacations-dao");


async function addFollowedVacation(userId, followedVacationId) {

    await followedVacationsDao.addFollowedVacation(userId, followedVacationId);
}


async function deleteUserFollowedVacation(userId, vacationId) {

    await followedVacationsDao.deleteUserFollowedVacation(userId, vacationId);
}


async function getUserFollowedVacations(userId) {

    let userFollowedVacations = await followedVacationsDao.getUserFollowedVacations(userId);

    return userFollowedVacations;
}


async function getAllFollowedVacations() {

    let allFollowedVacations = await followedVacationsDao.getAllFollowedVacations();

    return allFollowedVacations;
}


async function deleteFollowedVacation(vacationId) {

    await followedVacationsDao.deleteFollowedVacation(vacationId);
}



module.exports = {
    addFollowedVacation,
    deleteUserFollowedVacation,
    getUserFollowedVacations,
    getAllFollowedVacations,
    deleteFollowedVacation
}