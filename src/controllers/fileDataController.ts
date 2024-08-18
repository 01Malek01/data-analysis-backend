import expressAsyncHandler from "express-async-handler";
import FileData from "../models/FileData.js";
import { Request, Response } from "express";

 const uploadData = expressAsyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

const getData = expressAsyncHandler(async (req: Request, res: Response) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const fileData = await FileData.find({ userId: currentUserId });

  res.status(200).json(fileData);
});

const getFile = expressAsyncHandler(async (req: Request, res: Response) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id } = req.params;

  const fileData = await FileData.findOne({ _id: id, userId: currentUserId });

  if (!fileData) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  res.status(200).json(fileData);
});

const uploadNote = expressAsyncHandler(async (req: Request, res: Response) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { id } = req.params;
  const { text } = req.body;

  const fileData = await FileData.findOne({ _id: id, userId: currentUserId });

  if (!fileData) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  if (!text) {
    res.status(400).json({ message: "Note is required" });
    return;
  }

  fileData.notes.push({ text, userId: currentUserId, createdAt: new Date() });

  await fileData.save();

  res.status(200).json(fileData);
});

const updateNote = expressAsyncHandler(async (req: Request, res: Response) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id } = req.params;
  const { note } = req.body;

  const fileData = await FileData.findOne({ _id: id, userId: currentUserId });

  if (!fileData) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  if (!note) {
    res.status(400).json({ message: "Note is required" });
    return;
  }

  const noteIndex = fileData.notes.findIndex((n: any) => n._id === note._id);

  if (noteIndex === -1) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  fileData.notes[noteIndex] = note;

  await fileData.save();

  res.status(200).json(fileData);
});

const deleteNote = expressAsyncHandler(async (req: Request, res: Response) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id } = req.params;
  const noteId = req.body.noteId;
  const fileData = await FileData.findOne({ _id: id, userId: currentUserId });

  if (!fileData) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  const noteIndex = fileData.notes.findIndex((n: any) => n._id.toString() === noteId.toString());

  if (noteIndex === -1) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  fileData.notes.splice(noteIndex, 1);

  await fileData.save();

  res.status(200).json(fileData);
});
export { getData, getFile, uploadData, uploadNote, updateNote, deleteNote };
