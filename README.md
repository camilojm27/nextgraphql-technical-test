## Prueba Técnica para Desarrollador Fullstack Senior

### Introducción

El objetivo de esta prueba técnica es evaluar tus habilidades en el desarrollo de una aplicación fullstack. Deberás implementar un sistema de gestión de ingresos y egresos, la gestión de usuarios y la generación de reportes. El proyecto cuenta con [wireframes](<https://www.figma.com/design/2PINjveveJJ9ZAAwxwNoRK/Wireframes-(Copy)?node-id=0-1&t=6q0Q0id8YnjH9fJt-1>) que pueden servir de guía para el candidato. Sin embargo, el diseño de la interfaz de usuario es libre.

## Instalación

1. Clonar o descargar el código fuente:
   ```sh
   git clone https://github.com/camilojm27/nextgraphql-technical-test.git
   ```
2. Instalar las dependencias:
   ```sh
   npm install
   ```
3. Copiar el archivo `.env.example` y llamarlo `.env` o `.env.local`. Dentro de este archivo, agregar las variables de entorno necesarias.

4. Crear una base de datos Postgres en local o usar Supabase y agregar la URL con los datos de conexión:
   ```sh
   postgres://db_username:password@127.0.0.1:5432/database_name
   ```
5. La variable `PUBLIC_BASE_URL` hace referencia a la dirección de la página web durante el desarrollo o despliegue.
   - `AUTH_SECRET`: Llave de 32 bits para encriptar el JWT.
   - `AUTH0_*`: Todas las variables que comiencen por `AUTH0` deben ser proporcionadas por la página de Auth0. Debes registrarte, crear una aplicación y pegar esos valores.

6. Crear el esquema en la base de datos:
   ```sh
   npx prisma db push
   ```
7. Ejecutar el servidor de desarrollo:
   ```sh
   npm run dev
   ```

### Vercel

Para desplegar en Vercel, se deben seguir los mismos pasos. Las variables de entorno se agregan en Vercel (se puede copiar el archivo `.env`).

- La base de datos debe ser accesible a internet, por lo que se deben usar servicios como Supabase, Azure, AWS, etc. Agrega la URL de conexión a las variables de entorno.
- Es importante crear el esquema en la base de datos. Para esto, debes agregar la URL de conexión a tu proyecto en local y ejecutar:
  ```sh
  npx prisma db push
  ```
  una ÚNICA VEZ.

### Requisitos del Proyecto

### Requisitos Técnicos

- **Tecnologías y Herramientas:**
  - **Backend:**
    Tuve muchos inconvenientes implementando `Auth.js` utilizando el enrutador de páginas de Next.js, ya que esta nueva versión está diseñada para el enrutador de aplicaciones y, aunque en teoría "soporta" el enrutador de páginas, presenta muchos problemas y no hay documentación adecuada. Después de 3 días intentando, decidí utilizar la versión antigua de `next-auth`.

  - **Protección de Datos:** 
    Solo implementé protección en el frontend. Debería haber protegido las rutas de la API GraphQL.

  - **Autenticación:**
    Inicialmente, había creado un sistema de registro y login, pero como Auth0 tiene estas funcionalidades además de las redes sociales, decidí dejar solo Auth0 (no eliminé los archivos del sistema que empecé a implementar).

  - **Pruebas Unitarias:**
    Por cuestiones de tiempo, no implementé pruebas unitarias.

  - **Despliegue:**
    Realicé exitosamente el despliegue en Vercel y Supabase.