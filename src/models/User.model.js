import mongoose from "mongoose";

export const USER_PROPS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    USERNAME: 'username',
    VERIFICATION_TOKEN: 'verification_token',
    VERIFIED: 'verified',
    CREATED_AT: 'created_at',
    MODIFIED_AT: 'modified_at',
    ACTIVE: 'active'
}
const userSchema = new mongoose.Schema({
    [USER_PROPS.USERNAME]: {
        type: String,
        required: true,
        unique: true
    },
    [USER_PROPS.EMAIL]: {
        type: String,
        required: true,
        unique: true
    },
    [USER_PROPS.PASSWORD]: {
        type: String,
        required: true
    },
    [USER_PROPS.VERIFIED]: {
        type: Boolean,
        default: false
    },
    [USER_PROPS.VERIFICATION_TOKEN]: {
        type: String
    },
    [USER_PROPS.CREATED_AT]: {
        type: Date,
        default: Date.now
    },
    [USER_PROPS.MODIFIED_AT]: {
        type: Date
    },
    [USER_PROPS.ACTIVE]:{
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', userSchema); //creamos el modelo de usuario

export default User; //exportamos el modelo de usuario