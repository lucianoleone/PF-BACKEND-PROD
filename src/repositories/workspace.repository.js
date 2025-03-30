import Workspace from '../models/Workspace.model.js'
import { ServerError } from '../utils/error.util.js'
class WorkspaceRepository {
    async createWorkspace ({name, owner_id}) {

        const workspace = await Workspace.create({
            name, 
            owner: owner_id, 
            members: [owner_id]
        })

        return workspace
    }
    async findWorkspaceById(id) {
        return await Workspace.findById(id)
    }
    async addNewMember({workspace_id, owner_id,invited_id}){
        const workspace_found = await this.findWorkspaceById(workspace_id)
        if(!workspace_found){
            throw new ServerError('Workspace not found', 404)
        } 
        if(!workspace_found.owner.equals(owner_id)){
            throw new ServerError('You are not the owner of this workspace', 403) //403 es un error de autorizacion
        }
        if(workspace_found.members.includes(invited_id)){
            throw new ServerError('User already in workspace', 400)
        }
        //---Con las siguientes dos lineas se guarda el id del invitado en los miembros del workspace----//
        workspace_found.members.push(invited_id)
        await workspace_found.save()
        //-------------------------------------------------------------------------------------------//

        return workspace_found
    }
} //exportamos la funcion de creacion de workspace
const workspaceRepository = new WorkspaceRepository()
export default workspaceRepository