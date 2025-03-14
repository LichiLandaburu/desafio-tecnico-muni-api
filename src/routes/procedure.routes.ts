import { Router } from "express";
import { changeProcedureStatus, createProcedure, downloadProcedureDocument, getProcedureByID, getProcedures, updateProcedure, uploadProcedureDocument } from "../controllers/procedure.controller";
import { uploadDocument } from "../middlewares/multer.middleware";
import { validateJWT } from "../middlewares/auth.middleware";
import { checkRol } from "../middlewares/rol.middleware";

const procedureRouter = Router();

procedureRouter.get("/", getProcedures);
procedureRouter.get("/:id", getProcedureByID);
  
procedureRouter.post("/create", createProcedure);

procedureRouter.put("/:id", [ validateJWT as any, checkRol("admin") ], updateProcedure);
procedureRouter.patch("/:id/change-status", [ validateJWT as any, checkRol("admin") ], changeProcedureStatus);

procedureRouter.post("/:id/upload-document", [ validateJWT as any ], uploadDocument, uploadProcedureDocument);
procedureRouter.get("/:id/download-document", [ validateJWT as any, checkRol("admin") ], downloadProcedureDocument);

export { procedureRouter };

