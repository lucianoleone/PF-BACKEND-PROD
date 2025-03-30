
import ENVIROEMNT from "../config/enviroment.config.js";
import UserRepository from "../repositories/user.repository.js";
import { ServerError } from "../utils/error.util.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from "../utils/mailer.utils.js";

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body; //obtenemos los datos del body
        if (!username) {
            console.log('El username es requerido');
            throw new ServerError('El username es requerido', 400);
        }
        if (!email) {
            console.log('El email es requerido');
            throw new ServerError('El email es requerido', 400);
        }
        if (!password) {
            console.log('El password es requerido');
            throw new ServerError('El password es requerido', 400);
        }
        const passwordHash = await bcrypt.hash(password, 10); //encriptamos la contraseña
        const verification_token = jwt.sign({ email }, ENVIROEMNT.SECRET_JWT_KEY, { expiresIn: '24h' }); //creamos el token
        await UserRepository.create({ username, email, password: passwordHash, verification_token }); //guardamos el usuario en la base de datos
        await sendMail({
            to: email,
            subject: 'Verifica tu cuenta',
            html: `
            <h1>Verifica tu cuenta de stack</h1>
            <p>Haz click en el siguiente enlace para verificar tu cuenta: </p>
            <a href='${ENVIROEMNT.URL_BACKEND}/api/auth/verify-email?verification_token=${verification_token}'>Verificar cuenta</a>`
        })
        //res.redirect(ENVIROEMNT.URL_FRONTEND); //cuando funcione el frontend
        return res.send({
            ok: true,
            message: 'Usuario registrado con exito',
            status: 201
        }); //enviamos un mensaje de respuesta
    } catch (error) {
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

export const verifyEmailController = async (req, res) => {
    try {

        const { verification_token } = req.query; //obtenemos el token por query
        const payload = jwt.verify(verification_token, ENVIROEMNT.SECRET_JWT_KEY); //verificamos el token
        console.log(payload);
        const { email } = payload; //obtenemos el email del payload
        const user_found = await UserRepository.verifiyUser(email); //verificamos el usuario

        if (!user_found) {
            throw new ServerError('User not verified', 404);
        } else {
            return res.send({
                ok: true,
                message: 'User verified successfully',
                status: 200
            });
        }
    } catch (error) {
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

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body; //obtenemos los datos del body
        const user_found = await UserRepository.findUserByEmail(email) //buscamos el usuario por email
        if (!user_found) {
            throw new ServerError('User not found', 404);
        }
        if (!user_found.verified) {
            throw new ServerError('User not verified', 400);
        }
        const passwordMatch = await bcrypt.compare(password, user_found.password); //comparamos la contraseña
        if (!passwordMatch) {
            throw new ServerError('Invalid password', 400);
        } else {
            const authorization_token = jwt.sign
                (
                    {
                        _id: user_found._id,
                        username: user_found.username,
                        email: user_found.email
                    },
                    ENVIROEMNT.SECRET_JWT_KEY,
                    { expiresIn: '2h' }
                ); //creamos el token
            return res.json({
                ok: true,
                message: 'User logged in successfully',
                status: 200,
                payload: {
                    authorization_token,
                    username: user_found.username
                }
            });
        }
    } catch (error) {
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

export const resetPasswordController = async (req, res) => {
    try {
        const { email } = req.body; //obtenemos los datos del body
        const user_found = await UserRepository.findUserByEmail(email) //buscamos el usuario por email
        if (!user_found) {
            throw new ServerError('User not found', 404);
        }
        if (!user_found.verified) {
            throw new ServerError('User not verified', 400);
        }
        const reset_token = jwt.sign({ email, _id: user_found._id }, ENVIROEMNT.SECRET_JWT_KEY, { expiresIn: '24h' }); //creamos el token
        await sendMail({
            to: email,
            subject: 'Restablece tu contraseña',
            html: `
            <h1>Restablece tu contraseña</h1>
            <p>Haz click en el siguiente enlace para restablecer tu contraseña: </p>
            <a href='${ENVIROEMNT.URL_FRONTEND}/rewrite-password?reset_token=${reset_token}'>Restablecer contraseña</a>`
        }); //enviamos el correo
        return res.send({
            ok: true,
            message: 'Email sent successfully',
            status: 200
        }); //enviamos un mensaje de respuesta
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
export const rewritePasswordController = async (req, res) => {
    try {
        const { password, reset_token } = req.body;
        const { _id } = jwt.verify(reset_token, ENVIROEMNT.SECRET_JWT_KEY); //verificamos el token
        const passwordHash = await bcrypt.hash(password, 10); //encriptamos la contraseña
        await UserRepository.updateUserPassword(_id, passwordHash);
        return res.send({
            ok: true,
            message: 'Password changed successfully',
            status: 200
        }); //enviamos un mensaje de respuesta
    } catch (error) {
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