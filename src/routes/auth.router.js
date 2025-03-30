import express from 'express';
import { loginController, registerController, resetPasswordController, rewritePasswordController, verifyEmailController } from '../controllers/auth.controller.js';

const authRouter = express.Router(); //creamos el enrutador

authRouter.post('/register', registerController);
authRouter.get('/verify-email', verifyEmailController);
authRouter.post('/login', loginController);
authRouter.post('/reset-password', resetPasswordController);
authRouter.put('/rewrite-password', rewritePasswordController);

export default authRouter; //exportamos el enrutador