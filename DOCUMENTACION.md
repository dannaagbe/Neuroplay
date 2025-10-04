# Documentación del Sistema de Autenticación y Usuarios

## ¿Qué hace este sistema?

Este proyecto es una API (un programa que responde a peticiones) hecha con NestJS. Permite:
- Registrar usuarios con correo, nombre, roles, idioma preferido, nivel inicial y password.
- Iniciar sesión usando JWT (un tipo de "llave" digital segura).
- Proteger rutas para que solo usuarios con sesión puedan acceder.
- Crear, leer, actualizar y borrar usuarios (CRUD).

## ¿Cómo funciona la autenticación?

1. **Registro:**
   - Un usuario se registra enviando su información y password.
   - La password se guarda de forma segura (encriptada).
2. **Login:**
   - El usuario envía su correo y password.
   - Si son correctos, recibe un *token* JWT.
   - Este token se usa para acceder a rutas protegidas.

## ¿Qué es JWT?
- Es como una credencial digital que te da acceso a partes privadas del sistema.
- Debes enviarla en cada petición protegida, en la cabecera `Authorization` así:
  ```
  Authorization: Bearer TU_TOKEN_AQUI
  ```

## ¿Cómo ejecuto el proyecto? (¡Fácil!)

1. **Instala Node.js** (si no lo tienes):
   - Descárgalo de https://nodejs.org
2. **Abre una terminal en la carpeta del proyecto.**
3. **Instala las dependencias:**
   ```
npm install
   ```
4. **Ejecuta el servidor:**
   ```
npm run start:dev
   ```
5. **¡Listo!**
   - El servidor estará corriendo en `http://localhost:3000`

## ¿Cómo pruebo los endpoints?

Puedes usar [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para hacer peticiones HTTP.

### 1. Registrar usuario
- **POST** `http://localhost:3000/auth/register`
- **Body (JSON):**
  ```json
  {
    "correo": "ejemplo@email.com",
    "password": "123456",
    "nombre": "Juan",
    "roles": ["user"],
    "idiomaPreferido": "es",
    "NivelInicial": "A1"
  }
  ```

### 2. Login
- **POST** `http://localhost:3000/auth/login`
- **Body (JSON):**
  ```json
  {
    "correo": "ejemplo@email.com",
    "password": "123456"
  }
  ```
- **Respuesta:**
  ```json
  {
    "access_token": "..."
  }
  ```

### 3. Usar el token JWT
- Copia el `access_token` y agrégalo en la cabecera `Authorization` de tus peticiones:
  ```
  Authorization: Bearer TU_TOKEN_AQUI
  ```

### 4. Endpoints CRUD de usuarios
- **GET** `/users` — Lista todos los usuarios
- **GET** `/users/:id` — Ver un usuario
- **POST** `/users` — Crear usuario
- **PUT** `/users/:id` — Actualizar usuario
- **DELETE** `/users/:id` — Borrar usuario

> **Nota:** Algunos endpoints pueden requerir el token JWT.

## ¿Dónde está la base de datos?
- Se usa MySQL con la configuración del archivo `.env`. Asegúrate de tener MySQL corriendo.

---

¡Listo! Ahora puedes crear usuarios, iniciar sesión y proteger rutas como un pro. Si tienes dudas, ¡pide ayuda a tu profe o busca en Google!
