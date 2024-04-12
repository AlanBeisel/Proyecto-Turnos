import { Router } from "express";
import { createUser, getAllUsers, getUserById, loginUser } from "../controllers/User.Controller";
// import auth from "../middlewares/atenticacion";

const router: Router = Router();




// router.get("/", auth, getAllUsers)

router.get("/", getAllUsers)

router.post("/register", createUser)

router.get("/:id", getUserById)

router.post("/login", loginUser )



export default router;