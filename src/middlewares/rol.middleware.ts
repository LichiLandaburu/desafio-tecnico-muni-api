import { NextFunction, Request, Response } from "express";

export function checkRol(authorizedRoles: string[]) {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req.body;

      if (!user) return res.status(401).json({ error: "Unauthorized" });

      const hasAuthorizedRole = authorizedRoles.some(role =>
        user.roles.includes(role)
      );

      if (!hasAuthorizedRole) return res.status(401).json({ error: "Unauthorized" });

      next();
    }
    catch (error) {
      res.status(500).json({ error: "Internal server error" }); 
    }
  }
}
