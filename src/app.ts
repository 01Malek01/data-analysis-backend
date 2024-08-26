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

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://data-analysis-frontend-wine.vercel.app" // Production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Make sure to change this to your allowed origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Cache-Control", "no-store"); // This prevents caching
  next();
});

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
