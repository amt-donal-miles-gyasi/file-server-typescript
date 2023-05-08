const { Router } = require('express');
const  {getUsers, register, login, protecteds, logout, reset, updatePassword, putFiles, downloadFiles, sendEmailFile } = require('../controllers/auth');
// const getUsers = require('../dbb')
const routes = Router();
const { registerValidation, loginValidation, passwordValidation } = require('../validators/validator');
const { validationMiddleware, userAuth, verifyToken } = require('../middlewares/auth-middleware');
// const { verifyJWT } = require('../middlewares/verifyjwt');
const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void)=>{
        cb(null, './fileUpload')
    },
    filename : (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void)=>{
        let randomNum = Math.floor(Math.random() * 300)
        cb(null, `${Date.now()}-${randomNum}-${file.originalname}`)
    }
});








const upload = multer( {storage: fileStorage})

routes.get('/get-users', getUsers);
routes.get('/protected',  protecteds);
routes.get('/reset-password/:id/:token', verifyToken) 
routes.get('/get-file/:id', downloadFiles) 
routes.post('/reset-password/:id/:token/', passwordValidation, validationMiddleware, updatePassword) 
routes.post('/register', registerValidation, validationMiddleware, register )
routes.post('/login',  loginValidation, validationMiddleware, login)
routes.post('/reset-password', reset)
routes.post('/put-files',upload.single('file') , putFiles)
routes.post('/put-files/:id', sendEmailFile)
routes.get('/logout',   logout)

module.exports = routes;