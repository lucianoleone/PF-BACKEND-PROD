import User, { USER_PROPS } from "../models/User.model.js";
import { ServerError } from "../utils/error.util.js";

class UserRepository {
    async create ({username, email, password, verification_token}) {
        try{
        await User.create({
            [USER_PROPS.USERNAME]: username, 
            [USER_PROPS.EMAIL]: email, 
            [USER_PROPS.PASSWORD]: password, 
            [USER_PROPS.VERIFICATION_TOKEN]: verification_token
        })}
        catch (error) {
            if(error.code === 11000){
                if(error.keyPattern.username){
                    throw new ServerError("Username already registered", 400)
                }
                if(error.keyPattern.email){
                    
                    throw new ServerError("Email already registered", 400)
                }
            }
            console.log('Error al crear el usuario', error)
            
            throw error
        }
        
    }

    async findUserByEmail(email) {
        try{
        const user_found = await User.findOne({[USER_PROPS.EMAIL]: email})
        return user_found
        }
        catch (error) {
            console.log('Error al buscar el usuario', error)
            throw error
        }
    }

    async findUserById(id) {
        try{
        const user_found = await User.findById(id)
        return user_found
        }
        catch (error) {
            console.log('Error al buscar el usuario', error)
            throw error
        }
    }

    async verifiyUser(email) {
        try{
        const user_found = await this.findUserByEmail(email)
        if (!user_found) {
            throw new ServerError('User not found', 404);
        }
        if (user_found.verified) {
            throw new ServerError('User already verified', 400);
        }
        user_found.verified = true; //marcamos el usuario como verificado
        await user_found.save(); //guardamos el usuario en la base de datos
        return user_found
    }
    catch (error) {
        console.log('Error al buscar el usuario', error)
        throw error
    }
}

async updateUserPassword(_id, passwordHash) {
    try{
        const user_found = await this.findUserById(_id); //buscamos el usuario por id
        if (!user_found) {
            throw new ServerError('User not found', 404);
        }
        if (!user_found.verified) {
            throw new ServerError('User not verified', 400);
        }
        user_found.password = passwordHash; //actualizamos la contraseña
        await user_found.save(); //guardamos el usuario en la base de datos
    }
    catch (error) {
        console.log('Error al buscar el usuario', error)
        throw error
    }
}
}


export default new UserRepository;