import expressAsyncHandler from "express-async-handler";
import FileData from "../models/FileData.js";

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


export const uploadNote = expressAsyncHandler(async (req, res) => {
  const { userId, text } = req.body;
  const fileData = await FileData.findById(req.params.id);
  if (fileData) {
    fileData.notes.push({ userId, text,noteId: Date.now().toString() });
    await fileData.save();
    res.status(201).json(fileData.notes);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

export const updateNote = expressAsyncHandler(async (req, res) => {
  const { text } = req.body;
  const fileData = await FileData.findById(req.params.id);
  if (fileData) { 
    //@ts-expect-error
    fileData.notes = fileData.notes.map((note) => {
      if (note.userId === req.userId) {
        return { ...note, text };
      }
      return note;
    });
    await fileData.save();
    res.status(201).json(fileData.notes);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

export const deleteNote = expressAsyncHandler(async (req, res) => {
  const { noteId } = req.body;
  const fileData = await FileData.findById(req.params.id);
  if (fileData) {
    //@ts-expect-error
    fileData.notes = fileData.notes.filter((note) => note._id?.toString() !== noteId.toString());
    await fileData.save();
    res.status(201).json(fileData.notes);
  } else {
    res.status(404).json({ message: "File not found" });
  }
})