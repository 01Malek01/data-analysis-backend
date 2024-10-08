import { Schema, model } from "mongoose";
import FileData from "./FileData.js";

const dataSourceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String },
  uploadUrl: { type: String },
  fileId: { type: Schema.Types.ObjectId, ref: "FileData" },
  config: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

dataSourceSchema.post("save", async function () {
  try {
    const fileData = await FileData.findOne({ name: this.name });
    if (fileData) {
      this.fileId = fileData._id;
      await this.save();
    } else {
      console.log(`No FileData found for name: ${this.name}`);
    }
  } catch (err) {
    console.error(`Error in post-save hook: ${err}`);
  }
});
const DataSource = model("DataSource", dataSourceSchema);
export default DataSource;
