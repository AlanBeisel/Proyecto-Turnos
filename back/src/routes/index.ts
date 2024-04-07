import { Router } from "express";
import userRoutes from './userRoutes'
import appointmentsRoutes from './appointmentsRoutes'

const router = Router();

router.use("/users", userRoutes )

router.use("/appointment" , appointmentsRoutes)

export default router;