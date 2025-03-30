import {Router} from 'express';
import { createWorkspaceController, getAllWorkspacesController, inviteUserToWorkspaceController} from '../controllers/workspace.controller.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const workspaceRouter = Router(); //creamos el enrutadorer(); //creamos el enrutador

workspaceRouter.post('/',authMiddleware, createWorkspaceController); //usamos el controlador de registro
workspaceRouter.post('/:workspace_id/invite/:invited_id',authMiddleware, inviteUserToWorkspaceController); //ruta para invitar usuarios al workspace
workspaceRouter.get('/:user_id',authMiddleware, getAllWorkspacesController)

export default workspaceRouter; //exportamos el enrutador