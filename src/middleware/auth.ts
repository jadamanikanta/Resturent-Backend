import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const secret:any = 'Manikanta'

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.header('Authorization');

  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {

    const secret:any = process.env.secret_hash
    const decoded = jwt.verify(token.split(' ')[1], secret) as any;
    
    
    
    
    if (decoded?.role !== "") {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    
    next();
  } catch (error:any) {
    res.status(401).json({ message: error?.message });
  }
};
