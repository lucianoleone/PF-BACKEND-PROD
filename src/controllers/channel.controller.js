
import ChannelRepository from "../repositories/channel.repository.js";
import MessageRepository from "../repositories/message.repository.js";

export const createChannelController = async (req, res) => {
    try {
        const { name } = req.body;
        const create_by = req.user._id;
        const { workspace_id } = req.params
        console.log(create_by, ' va a crear el channel', name, 'en el workspace', workspace_id);
        const new_channel = await ChannelRepository.createChannel({ name, create_by, workspace_id })
        return res.json({
            ok: true,
            message: 'Channel created successfully',
            data: {
                new_channel
            }
        })
    }


    catch (error) {
        console.log('error al crear el channel', error)
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


export const sendMessageController = async (req, res) => {
    try {
        const { message } = req.body;
        const created_by = req.user._id;
        const { channel_id } = req.params
        const new_message = await MessageRepository.createMessage({ message, created_by, channel_id })

        res.json({
            ok: true,
            message: 'Message sent successfully',
            data: {
                new_message
            }
        })
    }
    catch (error) {
        console.log('error al crear el mensaje', error)
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
export const getMessagesListFormChannelController = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { channel_id } = req.params
        const message_list = await MessageRepository.findMessagesByChannelId({ user_id, channel_id })
        return res.json({
            ok: true,
            message: 'Message list loaded successfully',
            data: {
                message_list
            }
        })
    }
    catch (error) {
        console.log('error al obtener lista de mensajes', error)
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