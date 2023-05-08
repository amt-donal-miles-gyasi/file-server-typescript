import { hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
const { SECRET, PASSECRET, SERVER_URL, CLIENT_URL } = require ('../constants/config') ;
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import {client} from '../dbb';
// import { type } from 'os';

type error= any;

interface User {
    user_id: number;
    username: string;
    email: string;
    roles: string[];
  }

exports.getUsers = async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query(`SELECT user_id, username, email FROM users`);
    // console.log(rows)
    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};


exports.register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    try {
      const hashedPassword = await hash(password, 10);
      await client.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3)", [username, email, hashedPassword]);
  
      res.status(201).json({
        success: true,
        message: "the registration was successful",
      });
    } catch (error: error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  exports.login = async (req: Request, res: Response) => {
    const user = req.user as User;
  
    let payload = {
      id: user.user_id,
      username: user.username,
      email: user.email,
    };
    try {
      const token = sign(payload, SECRET, {expiresIn: '1d'});
  
      return res.status(200).cookie("token", token, { httpOnly: true }).json({
        success: true,
        message: "Logged in",
        role: user.roles,
      });
    } catch (error: error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  exports.protecteds = async (req: Request, res: Response) => {
    try {
      const { rows } = await client.query("select * from files");
      return res.status(200).json({
        rows,
      });
    } catch (error: error) {
      console.log(error.message);
    }
  };
  
  exports.logout = async (req: Request, res: Response) => {
    try {
      return res.status(200).clearCookie("token", { httpOnly: true }).json({
        success: true,
        message: "Logged out",
      });
    } catch (error: error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  export const reset = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {
      const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      console.log(rows[0]);
      if (!rows.length) {
        console.log('user does not exist');
      }
      const user = rows[0];
  
      const payload = {
        id: user.user_id,
        email: user.email,
      };
  
      const token = sign(payload, 'SECRET', { expiresIn: '10m' });
      const link = `${CLIENT_URL}/reset-password/${user.user_id}/${token}`;
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gyasidonalmiles@gmail.com',
          pass: 'PASSECRET',
        },
      });
  
      const mailOptions = {
        from: 'gyasidonalmiles@gmail.com',
        to: `${email}`,
        subject: 'Reset Password link',
        text: `use this link to reset your password \n ${link}`,
      };
  
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      res.json({ link: 'generated' });
    } catch (error: error) {
      console.log(error.message);
      return res.status(500).json({ error: 'user does not exist' });
    }
  };
  
  export const updatePassword = async (req: Request, res: Response) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(password);
  
    try {
      const verified = verify(token, 'SECRET');
      if (verified) {
        let hashedPassword = await hash(password, 10);
        console.log(hashedPassword);
  
        const { rows } = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
        if (!rows.length) {
          return res.json({ error: 'user does not exist' });
        }
        const user = rows[0];
        console.log(user.username);
  
        await client.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, id]);
  
        res.json({ msg: 'password updated' });
      }
    } catch (error: error) {
      console.log(error.message);
    }
  };

  exports.downloadFiles = async(req: Request, res: Response)=>{
    let param = req.params
    try {
        const { rows }= await client.query(`SELECT * from files WHERE id = $1`, [param.id])
        res.download(rows[0].path, rows[0].originalname)
        await client.query(`UPDATE files SET downloadcount = downloadcount+1 where id = $1`,[param.id])
    } catch (error: error) {
        console.log(error.message)
    }
}

exports.putFiles = async(req: Request, res: Response)=>{
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

    try {
        const fileInDb =  await client.query('INSERT INTO files (path , originalname, title, description) values ($1, $2, $3, $4)',[req.file.path, req.file.originalname, req.body.title, req.body.description])
        res.json({ fileName: req.file })
    } catch (error: error) {
        console.log(error.msg)
    }
};

export const sendEmailFile = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { from, to, message } = req.body;
  
    try {
      const { rows } = await client.query('SELECT * FROM files WHERE id = $1', [id]);
      const fileInfo = rows[0];
  
      // send mail using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gyasidonalmiles@gmail.com',
          pass: PASSECRET,
        },
      });
  
      const mailOptions = {
        from: from,
        to: to,
        subject: 'check file',
        text: message,
        attachments: [
          {
            filename: fileInfo.originalname,
            path: fileInfo.path,
          },
        ],
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          client.query(`UPDATE files SET emailcount = emailcount+1 where path = $1`, [fileInfo.path]);
        }
      });
  
      res.json(rows[0]);
    } catch (error: error) {
      console.log(error.message);
    }
  };