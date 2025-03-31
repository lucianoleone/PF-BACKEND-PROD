import express from 'express';
import ENVIROEMNT from './config/enviroment.config.js';
import cors from 'cors';
import authRouter from './routes/auth.router.js';
import workspaceRouter from './routes/workspace.router.js';
import usersRouter from './routes/user.router.js';
import mongoose from './config/mongoDb.config.js';
import UserRepository from './repositories/user.repository.js';
import { sendMail } from './utils/mailer.utils.js';
import channelRouter from './routes/channel.router.js';


//inicializacion
const app = express(); //inicializamos express
app.use(cors()); 
//app.use(cors({origin: ENVIROEMNT.URL_FRONTEND}));
const corsOptions = {
    origin: ENVIROEMNT.URL_FRONTEND,  // La URL de tu frontend en Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json()); //usamos el middleware para que express pueda interpretar json

//rutas

app.use('/api/auth', authRouter); //usamos el enrutador de autenticación
app.use('/api/workspace',workspaceRouter); //usamos el enrutador de workspaces
app.use('/api/users',usersRouter)
app.use('/api/channels',channelRouter);         

app.listen(ENVIROEMNT.PORT, () => {
    console.log(`La aplicacion se esta escuchando en el puerto: ${ENVIROEMNT.PORT}`);
}) //escuchamos en el puerto que definimos en el archivo de configuración y la callback 
