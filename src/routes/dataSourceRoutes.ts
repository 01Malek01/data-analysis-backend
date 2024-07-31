import express from "express";
import { verifyUser } from "../controllers/userController.js";
import jwtCheck from "../middlewares/Auth/JWTCheck.js";
import { uploadFile } from "../controllers/dataSource.js";
import protect from "../middlewares/Auth/Protect.js";

const router = express.Router();

router.post("/upload", jwtCheck, protect, uploadFile);
export default router;
