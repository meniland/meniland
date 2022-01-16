const vacationLogic = require("../logic/vacations-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');




router.get("/", async (request, response, next) => {

    try {
        let vacations = await vacationLogic.getVacations();
        response.json(vacations);
    }
    catch (error) {
        return next(error);
    }
});


router.post("/", async (request, response, next) => {

    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let usertype = decoded.usertype;
    if (usertype == "admin") {

        let vacationDetails = request.body.vacation;

        try {
            await vacationLogic.addVacation(vacationDetails);
            response.json();
        }
        catch (error) {
            return next(error);
        }
    } else {
        console.log("WARNING!! hacking attempt");
    }


});


router.delete("/:id", async (request, response, next) => {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let usertype = decoded.usertype;
    if (usertype == "admin") {
        let vacationId = request.params.id;

        try {
            await vacationLogic.deleteVacation(vacationId);
            response.json();
        }
        catch (error) {
            return next(error);
        }
    } else {
        console.log("WARNING!! hacking attempt");
    }
});


router.put("/", async (request, response, next) => {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let usertype = decoded.usertype;
    if (usertype == "admin") {
        let vacationDetails = request.body.vacation;

        try {
            await vacationLogic.updateVacation(vacationDetails);
            response.json();
        }
        catch (error) {
            return next(error);
        }
    } else {
        console.log("WARNING!! hacking attempt");
    }
});


router.get("/vacations_and_followed", async (request, response, next) => {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.userId;
    try {
        let vacations = await vacationLogic.getAllVacationsJoinToUserFollowedVacations(userId);
        response.json(vacations);
    }
    catch (error) {
        return next(error);
    }
});



module.exports = router;