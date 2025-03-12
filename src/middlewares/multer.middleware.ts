import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString("utf8").toLowerCase();
    const fileName = file.originalname.split(" ").join("-");
    cb(null, fileName);
  }
}); 

export const uploadDocument = multer({ storage }).single("document");