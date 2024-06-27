import { configDotenv } from "dotenv";
import { DB_NAME } from "./constants.js";
import mongoose from "mongoose";
import app from "./app.js";

configDotenv();

// Connecting the database
(async () => {
  try {
    const connectDB = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Mongo db connected!! ${connectDB}`);
  } catch (error) {
    console.log("connection error", error);
  }
})();


// Routes import
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
