import { Router } from "express";
import { createUser, getAllUsers, deleteUser, getUserById } from "../controllers/User.Controller";

const router: Router = Router();




router.get("/", getAllUsers)

router.post("/register", createUser)

router.delete("/", deleteUser)

router.get("/:id", getUserById)



export default router;