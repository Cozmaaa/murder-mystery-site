// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  username: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction):void {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return 
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err:any, user:any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid access token' });
      return 
    }

    // Attach user to request object
    req.user = user as JwtPayload;
    next();
  });
}
