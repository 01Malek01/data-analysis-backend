import expressAsyncHandler from "express-async-handler";
import DataSource from "../models/DataSourceModel.js";
import FileData from "../models/FileData.js";

export const uploadFile = expressAsyncHandler(async (req, res) => {
  const currentUserId = req.userId;
  const { name, type, uploadUrl } = req.body;
  const existingDataSource = await DataSource.findOne({
    uploadUrl,
  });
  if (existingDataSource) {
    res.status(409).json({ message: "File already exists" });
    return;
  }
  const fileData = FileData.findOne({ name });
  if (!fileData) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  const newDataSource = await DataSource.create({
    userId: currentUserId,
    name,
    type,
    uploadUrl,
  });
  res.status(201).json(newDataSource);
});

export const getFiles = expressAsyncHandler(async (req, res) => {
  const currentUserId = req.userId;
  const files = await DataSource.find({ userId: currentUserId });
  res.status(200).json(files);
});



export const getDownloadLink = expressAsyncHandler(async (req, res) => {
  const fileUrl = await DataSource.findOne({ fileId: req.params.id }).populate("fileId").select("uploadUrl");
  if (!fileUrl) {
    res.status(404).json({ message: "File not found" });
    return;
  }
  res.status(200).json(fileUrl);
});
