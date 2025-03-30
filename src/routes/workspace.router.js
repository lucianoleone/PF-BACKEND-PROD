import {Router} from 'express';
import { createWorkspaceController, inviteUserToWorkspaceController} from '../controllers/workspace.controller.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const workspaceRouter = Router(); //creamos el enrutadorer(); //creamos el enrutador

workspaceRouter.post('/',authMiddleware, createWorkspaceController); //usamos el controlador de registro
workspaceRouter.post('/:workspace_id/invite/:invited_id',authMiddleware, inviteUserToWorkspaceController); //ruta para invitar usuarios al workspace

export default workspaceRouter; //exportamos el enrutador