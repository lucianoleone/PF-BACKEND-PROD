import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    workspace_ref:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Workspace', 
        required: true 
    },
    create_at: { 
        type: Date, 
        default: Date.now 
    },
    create_by: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel