import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import { Request, Response } from "express";

export const verifyUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send({ message: "User already exists" });
    }

    const user = await User.create(req.body);

    res.status(201).json(user);
  }
);
