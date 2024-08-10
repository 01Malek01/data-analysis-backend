import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import { Request, Response } from "express";
import FileData from "../models/FileData.js";

export const verifyUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // console.log(req.body);
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const user = await User.create(req.body);

    res.status(201).json(user);
  }
);

export const getUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ auth0Id: req.auth0Id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  }
);

export const getFilesCount = expressAsyncHandler(
  async (req: Request, res: Response) => {
  const userFilesCount = await FileData.countDocuments({ userId: req.userId });
  res.status(200).json({ userFilesCount });
  }
);


export const updateEmail = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    if(!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    const user = await User.findOneAndUpdate({ auth0Id: req.auth0Id }, { email }, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  }
)