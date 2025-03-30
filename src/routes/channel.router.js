import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createChannelController, getMessagesListFormChannelController, sendMessageController } from "../controllers/channel.controller.js";

const channelRouter = Router();

channelRouter.post('/:workspace_id', authMiddleware, createChannelController);
channelRouter.post('/:channel_id/messages', authMiddleware, sendMessageController);
channelRouter.get('/:channel_id/messages', authMiddleware, getMessagesListFormChannelController);

export default channelRouter