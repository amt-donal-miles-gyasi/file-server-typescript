import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const  {SECRET}  = require( '../constants/config');
import {client} from '../dbb';

// require('./passport-middleware')(passport);

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
  const { id, token } = req.params;

  console.log(id);
  try {
    const { rows } = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);

    if (!rows.length) {
      return res.json({ error: "user does not exist" });
    }

    const user = rows[0];
    const verify = jwt.verify(token, SECRET); //check you later

    res.json({
      verified: true,
      username: user.username
    });

  } catch (error: any) {
    console.log(error.message);
    res.json({ verified: false });
  }
  next();
};
