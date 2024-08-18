import mongoose, { Document } from "mongoose";

interface FileData extends Document {
  name: string;
  userId: string;
  fileType: string;
  data: unknown[];
  notes: {
    text: string;
    userId: string;
    createdAt: Date;
  }[];
}

const fileDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    fileType: { type: String },
    data: { type: [Object], required: true },
    notes: [
      {
        text: String,
        userId: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FileData = mongoose.model("FileData", fileDataSchema);
export default FileData;
