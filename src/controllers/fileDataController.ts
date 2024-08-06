import expressAsyncHandler from "express-async-handler";
import FileData from "../models/FileData.js";
import DataSource from "../models/DataSourceModel.js";

export const uploadData = expressAsyncHandler(async (req, res) => {
  const currentUserId = req.userId;
  if (!currentUserId) return;
  const { name, data, fileType } = req.body;
  const newFileData = await FileData.create({
    userId: currentUserId,
    name,
    data,
    fileType,
  });
  
  res.status(201).json(newFileData);
});

export const getData = expressAsyncHandler(async (req, res) => {
  const currentUserId = req.userId;
  const files = await FileData.find({ userId: currentUserId });
  res.status(200).json(files);
});

export const getFile = expressAsyncHandler(async (req, res) => {
  const fileData = await FileData.findById(req.params.id);
  res.status(200).json(fileData);
});
