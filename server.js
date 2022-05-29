import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import productRouter from "./routes/productRouter.js";

// Dotenv config
dotenv.config({ path: ".env.local" });

// Create an express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
   fileUpload({
      useTempFiles: true,
   })
);

// Connect to MongoDB
const URI = process.env.MONGO_URL;

mongoose
   .connect(URI)
   .then(() => console.log("Connected to MongoDB"))
   .catch((e) => console.log(`MongoDB Error: ${e}`));

// Routes
app.get("/", (req, res) => {
   res.json("Geevadon Full Ecommerce API");
});

app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", productRouter);

// Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
