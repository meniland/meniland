const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followedVacationsController = require("./controllers/followed_vacations-controller");
const fileController = require("./controllers/files-controller")
const express = require("express");
const server = express();
const errorHandler = require("./errors/error-handler");
const fileUpload = require("express-fileupload");
const loginFilter = require('./filters/login-filter');


server.use(fileUpload());
server.use(express.static("files"));
server.use(express.json());

const cors = require("cors");
server.use(cors({ origin: "http://localhost:3000"}));

server.use(loginFilter());

server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followed_vacations", followedVacationsController);
server.use("/files", fileController);

server.use(errorHandler);
server.listen(3001,() => console.log("listening on http://localhost:3001"));
