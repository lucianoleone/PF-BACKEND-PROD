import Message from "../models/Meesage.model.js"
import { ServerError } from "../utils/error.util.js";
import ChannelRepository from "./channel.repository.js";
import workspaceRepository from "./workspace.repository.js";


class MessageRepository {
    async createMessage({ message, created_by, channel_id }) {
        if (!message) {
            throw new ServerError('Message is required', 400);
        }
        const channel_found = await ChannelRepository.findChannelById(channel_id)
        if (!channel_found) {
            throw new ServerError('Channel not found', 404);
        }
        const workspace_found = await workspaceRepository.findWorkspaceById(channel_found.workspace_ref)
        if (!workspace_found) {
            throw new ServerError('Workspace not found', 404);
        }
        if (!workspace_found.members.includes(created_by)) {
            throw new ServerError('You are not a member of this workspace', 403);
        }
        const new_message = await Message.create({
            message,
            created_by,
            channel_ref: channel_id
        })
        return new_message
    }
    async findMessagesByChannelId({ channel_id, user_id }) {
        const channel_found = await ChannelRepository.findChannelById(channel_id)
        if (!channel_found) {
            throw new ServerError('Channel not found', 404);
        }
        const workspace_found = await workspaceRepository.findWorkspaceById(channel_found.workspace_ref)
        if (!workspace_found) {
            throw new ServerError('Workspace not found', 404);
        }
        if (!workspace_found.members.includes(user_id)) {
            throw new ServerError('You are not a member of this workspace', 403);
        }
        const messages_found = await Message.find({ channel_ref: channel_id }).populate('created_by', 'username email')
        return messages_found
    }
}

export default new MessageRepository