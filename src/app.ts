import express from "express";
import { envs } from "./config/envs";
import { dbConnect } from "./config/database";
import { userRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = envs.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/auth", userRouter);

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database. Server not started.", error);
  });