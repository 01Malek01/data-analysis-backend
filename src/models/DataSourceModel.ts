import { Schema, model } from "mongoose";

const dataSourceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String },
  uploadUrl: { type: String },
  config: { type: Schema.Types.Mixed},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const DataSource = model("DataSource", dataSourceSchema);
export default DataSource;
