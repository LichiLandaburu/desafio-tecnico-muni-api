import { NextFunction, Request, Response } from "express";

export function checkRol(authorizedRole: "admin" | "user") {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req.body;

      if (!user) return res.status(401).json({ error: "Unauthorized" });

      const hasAuthorizedRole = user.role === authorizedRole;

      if (!hasAuthorizedRole) return res.status(401).json({ error: "Unauthorized" });

      next();
    }
    catch (error) {
      res.status(500).json({ error: "Internal server error" }); 
    }
  }
}
