import { Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../models/user.model';
import { NextFunction } from 'express';

export const requireRole = (role: 'Admin' | 'Author') => (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
    if (err || !user || user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.user = user;

    return next();

  })(req, res, next);
};
