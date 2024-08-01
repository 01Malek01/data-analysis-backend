import mongoose from "mongoose";

const fileDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    fileType: { type: String},
    data: { type: [Object], required: true },
  },
  {
    timestamps: true,
  }
);
const FileData = mongoose.model("FileData", fileDataSchema);
export default FileData;
