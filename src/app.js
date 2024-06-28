import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/user.routes.js";
import { Router } from "express";


const app = express();

// Middlewares
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    })
  );
  app.use(express.json({ limit: "166kb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(cookieParser());

app.get("/api/v1/users", (req,res)=>{
  res.send("server is alive");
})


export default app