
import jwt from 'jsonwebtoken';
import { ServerError } from '../utils/error.util.js';
import ENVIROEMNT from '../config/enviroment.config.js';

export const authMiddleware = (req, res, next) => {
    try {
        //console.log(req.headers);
        const authorization_header = req.headers['authorization']
        if (!authorization_header) {
            throw new ServerError('No authorization header found', 401);
        }
        const authorization_token = authorization_header.split(' ')[1]
        if (!authorization_token) {
            throw new ServerError('No autrhorization token found', 401);
        }
        try {
            const user_info = jwt.verify(authorization_token, ENVIROEMNT.SECRET_JWT_KEY)
            req.user = user_info //guardamos el payload en la solicitud
            next()
        } catch (error) {
            throw new ServerError('Token invalido o vencido', 401);
        }
    } catch (error) {
        if (error.status) {
            return res.send({
                ok: false,
                message: error.message,
                status: error.status
            })
        }
        return response.send({
            ok: false,
            message: 'Internal server error',
            status: 500
        })
    }
}

