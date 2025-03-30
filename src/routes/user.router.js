import express from 'express';
import { deleteUserController, getAllUsersController, updateUserController } from '../controllers/user.controller.js';


const userRouter = express.Router(); //creamos el enrutador

userRouter.get('/', getAllUsersController); //usamos el controlador de registro
userRouter .delete('/:email', deleteUserController); //usamos el controlador de registro
userRouter.put('/:id', updateUserController); //usamos el controlador de registro


export default userRouter; //exportamos el enrutador

