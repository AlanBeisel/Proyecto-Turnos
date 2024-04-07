"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("../controllers/User.Controller");
const router = (0, express_1.Router)();
router.get("/", User_Controller_1.getAllUsers);
router.post("/register", User_Controller_1.createUser);
router.delete("/", User_Controller_1.deleteUser);
router.get("/id/:id", User_Controller_1.getUserById);
// router.get("/login",)
exports.default = router;
