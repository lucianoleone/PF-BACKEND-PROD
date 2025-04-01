# Servicio de Mensajería - Backend

Sistema de mensajería inspirado en Slack, desarrollado como proyecto final para el curso FullStack de UTN 2024/2025

## Descripción

Backend desarrollado en Node.js que provee una API para gestionar un sistema de mensajería en tiempo real. Utiliza MongoDB como base de datos para almacenar información de usuarios, workspaces, canales y mensajes.

## Características Principales

- Sistema de autenticación con verificación por email
- Recuperación de contraseña mediante email
- Protección de rutas mediante middleware de autenticación con JWT
- Gestión de workspaces y canales
- Sistema de mensajería en tiempo real

## Tecnologías Utilizadas

- Express.js - Framework web
- MongoDB - Base de datos
- Mongoose - ODM para MongoDB
- JWT (JSON Web Tokens) - Autenticación
- Bcrypt - Encriptación de contraseñas
- Nodemailer - Envío de emails

## Estructura de Datos

La aplicación gestiona cuatro modelos principales:

- Usuarios: Información personal y credenciales
- Workspaces: Espacios de trabajo compartidos
- Canales: Subdivisiones dentro de los workspaces
- Mensajes: Comunicaciones entre usuarios

## Seguridad

La aplicación implementa múltiples capas de seguridad:

- Autenticación mediante JWT
- Encriptación de contraseñas con Bcrypt
- Verificación de email para nuevos registros
- Middleware de autorización para protección de rutas

## Dificultades y aprendizajes


Este proyecto ha sido una experiencia transformadora que me permitió comprender en profundidad el funcionamiento de las aplicaciones web modernas. A pesar de contar con un trabajo estable, el conocimiento adquirido me ha abierto nuevas perspectivas sobre el desarrollo de software y espero poder aplicar estas habilidades en mi entorno laboral actual.

Ha sido un verdadero desafío poder balancear el tiempo entre las clases, las prácticas, el trabajo, la familia y otros estudios. Si bien el trabajo final quizás no pudo reflejar por cuestiones de tiempo todo el conocimiento adquirido durante el curso, estoy seguro de que lo aprendido formará parte permanente de mi caja de herramientas del conocimiento.

