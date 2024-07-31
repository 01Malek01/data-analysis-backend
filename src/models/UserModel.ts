import { Schema, model } from "mongoose";

const userSchema = new Schema({
  auth0Id: { type: String, required: true },//as the user when signing up the data is saved in auth0 database
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
export default User;
