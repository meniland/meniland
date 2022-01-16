const followedVacationsLogic = require("../logic/followed_vacations-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');


router.post("/", async (request, response, next) => {

    let followedVacationId = request.body.vacationId;
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
    
    try {
       await followedVacationsLogic.addFollowedVacation(userId, followedVacationId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


router.delete("/:vacationId", async (request, response, next) => {
    
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
    let vacationId = request.params.vacationId;

    try {
        await followedVacationsLogic.deleteUserFollowedVacation(userId, vacationId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


router.get("/user_followed_vacations", async (request, response, next) => {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
    console.log(userId)
    let userFollowedVacations;
    try {
        userFollowedVacations = await followedVacationsLogic.getUserFollowedVacations(userId);
        response.json(userFollowedVacations);
    }
    catch (error) {
        return next(error);
    }
});


router.get("/", async (request, response, next) => {
    
    let allFollowedVacations;
    try {
        allFollowedVacations = await followedVacationsLogic.getAllFollowedVacations();
        response.json(allFollowedVacations);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;