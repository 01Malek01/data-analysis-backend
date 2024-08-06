import { Schema, model } from "mongoose";

const analysisSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  dataSourceId: {
    type: Schema.Types.ObjectId,
    ref: "DataSource",
    required: true,
  },
  chartType: {
    enum: ["table", "pie", "bar", "line", "radar"],
    type: String,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Analysis = model("Analysis", analysisSchema);
export default Analysis;
