import { Request, Response, NextFunction } from "express";

export function siteAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-api-token"];

  if (!token || token !== process.env.SITE_API_TOKEN) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  next();
}
