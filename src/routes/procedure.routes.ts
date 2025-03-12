import { Router } from "express";
import { changeProcedureStatus, createProcedure, downloadProcedureDocument, getProcedureByID, getProcedures, updateProcedure, uploadProcedureDocument } from "../controllers/procedure.controller";
import { uploadDocument } from "../middlewares/multer.middleware";

const procedureRouter = Router();

procedureRouter.get("/", getProcedures);
procedureRouter.get("/:id", getProcedureByID);
  
procedureRouter.post("/create", createProcedure);

procedureRouter.put("/:id", updateProcedure);
procedureRouter.patch("/:id/change-status", changeProcedureStatus);

procedureRouter.post("/:id/upload-document", uploadDocument, uploadProcedureDocument);
procedureRouter.get("/:id/download-document", downloadProcedureDocument);

export { procedureRouter };

