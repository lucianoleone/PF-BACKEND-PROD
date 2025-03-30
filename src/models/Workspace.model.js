import mongoose from "mongoose";

const workspace_schema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    //los memebers son arrays de ids (dueño es uno solo miembros son mas de uno por eso el array)
    members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    create_at: { 
        type: Date, 
        default: Date.now 
    }
});

const Workspace = mongoose.model('Workspace', workspace_schema);

export default Workspace