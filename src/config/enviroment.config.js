import dotenv from 'dotenv';
dotenv.config()

const ENVIROEMNT = {
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    SECRET_JWT_KEY: process.env.SECRET_JWT_KEY,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    URL_BACKEND: process.env.URL_BACKEND,
    URL_FRONTEND: process.env.URL_FRONTEND,
}

export default ENVIROEMNT;