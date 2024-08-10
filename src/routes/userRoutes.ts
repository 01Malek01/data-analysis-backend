import express from "express";
import {
  verifyUser,
  getUser,
  getFilesCount,
  updateEmail,
} from "../controllers/userController.js";
import jwtCheck from "../middlewares/Auth/JWTCheck.js";
import protect from "../middlewares/Auth/Protect.js";
const router = express.Router();

router.post("/verify", jwtCheck, verifyUser);
router.get("/", jwtCheck, protect, getUser);
router.put("/", jwtCheck, protect, updateEmail);
router.get("/files-count", jwtCheck, protect, getFilesCount);

export default router;
