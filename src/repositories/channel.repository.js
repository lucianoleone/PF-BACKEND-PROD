import Channel from "../models/Channel.model.js";
import { ServerError } from "../utils/error.util.js";
import workspaceRepository from "./workspace.repository.js";

class ChannelRepository {
    async findChannelById(id) {
        const channel_found = await Channel.findById(id).populate('workspace_ref')
        return channel_found
    }
    async createChannel({ name, workspace_id, create_by }) {
        const workspace_found = await workspaceRepository.findWorkspaceById(workspace_id)
        if (!workspace_found) {
            throw new ServerError('Workspace not found', 404)
        }
        if (!workspace_found.members.includes(create_by)) {
            throw new ServerError('You are not a member of this workspace', 403)
        }
        const channel = await Channel.create({
            name,
            workspace_ref: workspace_id,
            create_by
        })
        return channel
    }
}

export default new ChannelRepository      