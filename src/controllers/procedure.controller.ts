import { Request, Response } from "express";
import { ProcedureModel } from "../models/Procedure";
import { UserModel } from "../models/User";
import { connectToFTP } from "../config/ftp";
import path from "path";
import fs from "fs";

const validStatus = ["pending", "rejected", "approved"];

export const getProcedures = async (req: Request, res: Response): Promise<void> => {
  try {
    const procedures = await ProcedureModel.findAll({
      include: [ 
        { 
          model: UserModel,
          as: "user" 
        } 
      ]
    });
    res.json({ procedures });
  } 
  catch (error) {
    res.status(500).json({ error: "Error getting procedures: " + error });
  }
}

export const getProcedureByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const procedure = await ProcedureModel.findByPk(id, {
      attributes: { exclude: ["id_user"] },
      include: [ 
        { 
          model: UserModel,
          as: "user"
        } 
      ],
    });
    if (!procedure) {
      res.status(404).json({ error: "Procedure not found" });
      return;
    }
    res.json({ procedure });
  } 
  catch (error) {
    res.status(500).json({ error: "Error getting procedure: " + error });
  }
}

export const createProcedure = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, lastname, email, dni, province, city, address, postal_code, telephone, status, detailed_document, comments, id_user } = req.body;
  
    if (!name || !lastname || !email || !dni || !province || !city || !address || !postal_code || !telephone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const procedure = await ProcedureModel.create({ name, lastname, email, dni, province, city, address, postal_code, telephone, status, detailed_document, comments, id_user });
    res.status(201).json({ procedure });
  }
  catch (error) {
    res.status(500).json({ error: "Error creating procedure: " + error });
  }
}

export const updateProcedure = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { name, lastname, email, dni, province, city, address, postal_code, telephone, detailed_document, comments } = req.body;
    const procedure = await ProcedureModel.findByPk(id);
    if (!procedure) {
      res.status(404).json({ error: "Procedure not found" });
      return;
    }

    await ProcedureModel.update({ name, lastname, email, dni, province, city, address, postal_code, telephone, detailed_document, comments, updatedAt: new Date() }, { where: { id } });

    res.json({ message: "Procedure updated successfully" });
  }
  catch (error) {
    res.status(500).json({ error: "Error updating procedure: " + error });
  }
}

export const changeProcedureStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { status } = req.body;
    const procedure = await ProcedureModel.findByPk(id);
    if (!procedure) {
      res.status(404).json({ error: "Procedure not found" });
      return;
    }

    if (!validStatus.includes(status)) {
      res.status(400).json({ error: "Invalid status, it must be one of the following: pending, rejected, approved" });
      return;
    }

    await ProcedureModel.update({ status, updatedAt: new Date() }, { where: { id } });

    res.json({ message: "Procedure status updated successfully" });
  }
  catch (error) {
    res.status(500).json({ error: "Error updating procedure status: " + error });
  }
}

export const uploadProcedureDocument = async (req: Request, res: Response): Promise<void> => {
  
  const { id } = req.params;

  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const client = await connectToFTP();

  try {
    const procedure = await ProcedureModel.findByPk(id);
    if (!procedure) {
      res.status(404).json({ error: "Procedure not found" });
      return;
    }

    const { path, originalname } = req.file;
  
    const fileExt = originalname.split(".").pop();

    if (fileExt !== "pdf") {
      res.status(400).json({ error: "Only PDF files are allowed" });
      return;
    }

    await client.ensureDir("/uploads");
    await client.uploadFrom(path, `/uploads/${originalname}`);  

    await ProcedureModel.update({ detailed_document: `uploads/${originalname}` }, { where: { id } });

    res.json({ message: "Procedure document uploaded successfully" });
  }
  catch (error) {
    res.status(500).json({ error: "Error uploading procedure document: " + error });
  }
  finally {
    if (client) {
      await client.close();
      console.log("FTP client closed");
    }
  }
}

export const downloadProcedureDocument = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const procedure = await ProcedureModel.findByPk(id);
    if (!procedure) {
      res.status(404).json({ error: "Procedure not found" });
      return;
    }

    const filePath = path.join(__dirname, "../../", procedure.detailed_document);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: "Procedure document not found" });
      return;
    }

    res.download(filePath);
  }
  catch (error) {
    res.status(500).json({ error: "Error downloading procedure document: " + error });
  }
}
