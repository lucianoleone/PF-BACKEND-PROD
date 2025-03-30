
import workspaceRepository from "../repositories/workspace.repository.js";
import { ServerError } from "../utils/error.util.js";

export const createWorkspaceController = async (req, res) => {
    try {
        const { name } = req.body;
        const owner_id = req.user._id;
        const new_workspace = await workspaceRepository.createWorkspace({ name, owner_id })

        res.json({
            ok: true,
            message: 'Workspace created successfully',
            data: {
                new_workspace
            }
        })
    }
    catch (error) {
        if (error.status) {

            return res.send({
                ok: false,
                message: error.message,
                status: error.status
            })
        }

        return res.send({
            ok: false,
            message: 'Internal server error',
            status: 500
        })

    }
}

export const inviteUserToWorkspaceController = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { invited_id, workspace_id } = req.params;
        const workspace_found = await workspaceRepository.addNewMember({ workspace_id, owner_id: user_id, invited_id })
        res.json({
            ok: true,
            satus: 201,
            message: 'User invited successfully',
            data: {
                workspace:workspace_found
            }
        })
    }
    catch (error) {
        if (error.status) {

            return res.send({
                ok: false,
                message: error.message,
                status: error.status
            })
        }

        return res.send({
            ok: false,
            message: 'Internal server error',
            status: 500
        })

    }
}

export const getAllWorkspacesController = async (req, res) => {
    try {
        const {user_id} = req.params
        console.log(user_id)
        const workspaces = await workspaceRepository.findWorkspaceByMemberId({ member_id: user_id })
        res.json({
            ok: true,
            satus: 200,
            message: 'Workspaces loaded successfully',
            data: {
                workspaces
            }
        })
    }
    catch (error) {
        if (error.status) {

            return res.send({
                ok: false,
                message: error.message,
                status: error.status
            })
        }

        return res.send({
            ok: false,
            message: 'Internal server error',
            status: 500
        })

    }
}