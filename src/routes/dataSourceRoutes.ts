import express from "express";
import jwtCheck from "../middlewares/Auth/JWTCheck.js";
import { uploadFile, getDownloadLink } from "../controllers/dataSourceController.js";
import protect from "../middlewares/Auth/Protect.js";

const router = express.Router();

router.post("/upload/", jwtCheck, protect, uploadFile);
router.get('/get-download-url/:id',jwtCheck,protect,getDownloadLink)
export default router;
