const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();


router.post("/login", async (request, response, next) => {

    let userDetails = request.body;
    let user;

    try {
        user = await usersLogic.login(userDetails);
        response.json(user);
    }
    catch (error) {
        return next(error);
    }
});


router.post("/", async (request, response, next) => {

    let userDetails = request.body;
    let user;
    try {
        user = await usersLogic.addUser(userDetails);
        response.json(user);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;