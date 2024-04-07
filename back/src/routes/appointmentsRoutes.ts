import { Router } from "express";
import { getAllAppointments, getAppointmentById, scheduleAppointment } from "../controllers/appointmentController";

const router: Router = Router();


router.get("/", getAllAppointments)

router.post("/nuevo", scheduleAppointment )

router.get("/:id" , getAppointmentById)





export default router;