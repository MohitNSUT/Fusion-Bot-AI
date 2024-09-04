import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import colors from "colors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middelwares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";

//dotenv
config();

//mongo connection
connectDB();

//rest object
const app = express();
app.use(express.json());

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true})); 
app.use(morgan("dev"));
app.use(errorHandler); 

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);

const PORT = process.env.PORT || 8000;

//listen server
app.listen(PORT, () => {
  console.log(
    `Server Running on port number ${PORT}`
  );
});


