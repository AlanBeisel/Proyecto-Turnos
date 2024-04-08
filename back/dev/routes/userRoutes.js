"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("../controllers/User.Controller");
// import auth from "../middlewares/atenticacion";
const router = (0, express_1.Router)();
// router.get("/", auth, getAllUsers)
router.get("/", User_Controller_1.getAllUsers);
router.post("/register", User_Controller_1.createUser);
router.get("/:id", User_Controller_1.getUserById);
router.post("/login");
exports.default = router;
