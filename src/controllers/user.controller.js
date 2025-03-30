
 export const getAllUsersController = async (req, res) => {
    try {
        const allUsers = {}; //obtenemos todos los usuarios
        return res.send({
            ok: true,
            message: 'Usuarios obtenidos con exito',
            payload: allUsers
        }); //enviamos un mensaje de respuesta
    } catch (error) {
        return res.send({
            ok: false,
            message: 'Internal server error',
            status: 500

        }); //enviamos un mensaje de respuesta
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const {email}= req.params; //obtenemos el email del usuario a eliminar
        console.log(email);
        return res.send({
            ok: true,
            message: 'Usuario eliminado con exito'
        }); //enviamos un mensaje de respuesta
    } catch (error) {
        return res.send({
            ok: false,
            message: 'Internal server error',
            status: 500
        }); //enviamos un mensaje de respuesta
    }
}


export const updateUserController = async (req, res) => {
    try {
        const {id}= req.params; //obtenemos el email del usuario a actualizar
        
        const {username, password} = req.body; //obtenemos los datos del body
        return res.send({
            ok: true,
            message: 'Usuario actualizado con exito'
        }); //enviamos un mensaje de respuesta
    } catch (error) {
        return res.send({
            ok: false,
            message: 'Internal server error',
            status: 500
        }); //enviamos un mensaje de respuesta
    }
}