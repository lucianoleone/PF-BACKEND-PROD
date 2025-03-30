import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: { 
        type: String, 
        required: true 
    },
    channel_ref:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Channel', 
        required: true },
    create_at: { 
        type: Date, 
        default: Date.now 
    },
    created_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message