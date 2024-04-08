import { Router } from "express";
import { cancelAppointmentController, getAllAppointments, getAppointmentById, scheduleAppointment } from "../controllers/appointmentController";

const router: Router = Router();


router.get("/", getAllAppointments)

router.post("/nuevo", scheduleAppointment )

router.put("/cancel/:id", cancelAppointmentController)

router.get("/:id" , getAppointmentById)





export default router;