const vacationDao = require("../dao/vacations-dao");
const PushController = require("../controllers/push-controller");
const followedVacationsDao = require("../dao/followed_vacations-dao");


async function getVacations() {
  
    let vacations = await vacationDao.getVacations();

    return vacations
}


async function addVacation(vacationDetails) {
  
    await vacationDao.addVacation(vacationDetails);
    let vacations = await vacationDao.getVacations();
    PushController.broadcast("updata-vacations-data", vacations);
}


async function deleteVacation(vacationId) {
  
    await vacationDao.deleteVacation(vacationId);
    let vacations = await vacationDao.getVacations();
    PushController.broadcast("updata-vacations-data", vacations);
    followedVacationsDao.deleteFollowedVacation(vacationId);
}


async function updateVacation(vacationDetails) {
  
    await vacationDao.updateVacation(vacationDetails);
    let vacations = await vacationDao.getVacations();
    PushController.broadcast("updata-vacations-data", vacations);
}


async function getAllVacationsJoinToUserFollowedVacations(userId) {
  
   let vacations = await vacationDao.getAllVacationsJoinToUserFollowedVacations(userId);
   return vacations;
}







module.exports = {
    addVacation,
    deleteVacation,
    getVacations,
    updateVacation,
    getAllVacationsJoinToUserFollowedVacations
}
