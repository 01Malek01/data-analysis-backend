import express from "express";
import { verifyUser } from "../controllers/userController.js";
import jwtCheck from "../middlewares/Auth/JWTCheck.js";
const router = express.Router();

router.post('/verify', jwtCheck,verifyUser)

export default router