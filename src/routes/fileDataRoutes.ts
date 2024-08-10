import express from "express";
import jwtCheck from "../middlewares/Auth/JWTCheck.js";
import protect from "../middlewares/Auth/Protect.js";
import {
  getData,
  getFile,
  uploadData,
  uploadNote,
  updateNote,
  deleteNote,
} from "../controllers/fileDataController.js";

const router = express.Router();

//data upload and retrieval
router.post("/upload-data", jwtCheck, protect, uploadData);
router.get("/get-data", jwtCheck, protect, getData);
router.get("/get-data/:id", jwtCheck, protect, getFile);

//notes
router.post('/:id/note',jwtCheck,protect,uploadNote);
router.put('/:id/note',jwtCheck,protect,updateNote);
router.delete('/:id/note',jwtCheck,protect,deleteNote);
export default router;
