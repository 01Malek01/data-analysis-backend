import { Schema, model } from "mongoose";

const visualizationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  analysisId: { type: Schema.Types.ObjectId, ref: "Analysis", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },//"table" | "chart" etc...
  config: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Visualization = model("Visualization", visualizationSchema);
export default Visualization;
