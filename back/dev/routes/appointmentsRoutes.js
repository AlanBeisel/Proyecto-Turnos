"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
router.get("/", appointmentController_1.getAllAppointments);
router.post("/nuevo", appointmentController_1.scheduleAppointment);
router.get("/:id", appointmentController_1.getAppointmentById);
exports.default = router;
