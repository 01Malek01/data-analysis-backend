import expressAsyncHandler from "express-async-handler";
import FileData from "../models/FileData";
import { Request, Response } from "express";

export const uploadData = expressAsyncHandler(async (req:Request, res:Response) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
     res.status(401).json({ message: "Unauthorized" });
     return;
  }

  const { name, data, fileType } = req.body;

  if (!name || !data || !fileType) {
     res.status(400).json({ message: "All fields are required" });
     return;
  }

  const newFileData = await FileData.create({
    userId: currentUserId,
    name,
    data,
    fileType,
  });

  res.status(201).json(newFileData);
});
