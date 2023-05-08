import { check, oneOf, CustomValidator } from 'express-validator';
import { compare } from  'bcrypt'
import { QueryResult } from 'pg';

import {client} from '../dbb'

//check password
const password = check('password')
.isLength({min: 3 , max: 15})
.withMessage('Password must be between 4 to 16 characters');

//check email
const email = check('email').isEmail().withMessage('Please provide a valid email');

// check username
const username = check('username')
.isLength({max: 100, min: 3})
.withMessage('username must be between 3 to 100 characters long')

//check if email exists
const emailExist = check('email').custom(async(value: string) => {
    const { rows }: QueryResult = await client.query(`SELECT * FROM users WHERE email = $1`, [value])

    if(rows.length){
        throw new Error('Email already exits')
    }
})

const usernameExists = check('username').custom(async(value: string) => {
    const { rows }: QueryResult = await client.query(`SELECT * FROM users WHERE username = $1`, [value])

    if(rows.length){
        throw new Error('Username already exits')
    }
});



const loginFieldsCheck =
    oneOf([
        check('email').custom(async(value: string, { req }) => {
            const user: QueryResult = await client.query(`SELECT * FROM users WHERE email = $1`, [value])
            if(!user.rows.length){
                throw new Error('Email does not exist')        
            }
            const validPassword = await compare(req.body.password, user.rows[0].password)

            if(!validPassword){
                throw new Error('Wrong Password')
            }
            req.user = user.rows[0]
        }),
        check('username').custom(async(value: string, { req }) => {
            const user: QueryResult = await client.query(`SELECT * FROM users WHERE username = $1`, [value])
            if(!user.rows.length){
                throw new Error('Username does not exist')
            }
            const validPassword = await compare(req.body.password, user.rows[0].password)

            if(!validPassword){
                throw new Error('Wrong Password')
            }
            req.user = user.rows[0];
        })
    ]);

const passwordValidator = check('confirmPassword')
.isLength({min: 3 , max: 15})
.withMessage('Password must be between 4 to 16 characters')
.custom(async(confirmPassword: string, {req}) => {
    const password = req.body.password
    if(password !== confirmPassword){
        throw new Error('Passwords must be same')
      }
});


module.exports=  {
    registerValidation: [email, password, emailExist, usernameExists, username],
    loginValidation: [loginFieldsCheck],
    passwordValidation: [passwordValidator]
};
