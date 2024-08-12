import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./routes/userRoutes.js";
import dataSourceRouter from "./routes/dataSourceRoutes.js";
import FileDataRouter from "./routes/fileDataRoutes.js";

const app = express();

dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.get('/test', (req, res) => {
  res.send('test')
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/data-source", dataSourceRouter);
app.use("/api/v1/file-data", FileDataRouter);
export default app;
