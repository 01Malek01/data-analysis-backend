import express from "express";
import jwtCheck from "../middlewares/Auth/JWTCheck.js";
import protect from "../middlewares/Auth/Protect.js";
import {
  getData,
  getFileData,
  uploadData,
} from "../controllers/fileDataController.js";

const router = express.Router();

router.post("/upload-data", jwtCheck, protect, uploadData);
router.get("/get-data", jwtCheck, protect, getData);
router.get("/get-data/:id", jwtCheck, protect, getFileData);
export default router;
