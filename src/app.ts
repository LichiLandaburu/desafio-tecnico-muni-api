import express from "express";
import { envs } from "./config/envs";
import { dbConnect } from "./config/database";
import { userRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { procedureRouter } from "./routes/procedure.routes";
import path from "path";

const PORT = envs.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  exposedHeaders: ["Content-Disposition"],
}));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

app.use("/api/auth", userRouter);
app.use("/api/procedures", procedureRouter);

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database. Server not started.", error);
  });