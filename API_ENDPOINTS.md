# API Endpoints - Neuroplay

## Autenticación

### Registro de usuario
```
POST /auth/register
Body: {
  "correo": "usuario@example.com",
  "contraseña": "password123",
  "nombre": "Juan Pérez",
  "roles": ["usuario"],
  "idiomaPreferido": "es",
  "nivelInicial": "principiante"
}
```

### Login
```
POST /auth/login
Body: {
  "correo": "usuario@example.com",
  "password": "password123"
}
Response: {
  "access_token": "jwt_token_aqui"
}
```

---

## Usuarios
**Requiere autenticación**: Agregar header `Authorization: Bearer {token}`

### Obtener todos los usuarios
```
GET /users
```

### Obtener un usuario
```
GET /users/:id
```

### Actualizar usuario
```
PATCH /users/:id
Body: { "nombre": "Nuevo Nombre", ... }
```

### Eliminar usuario
```
DELETE /users/:id
```

---

## Configuración de Usuario
**Requiere autenticación**

### Crear configuración
```
POST /configuracion-usuario
Body: {
  "usuarioId": 1,
  "tema": "oscuro",
  "idioma": "es",
  "velocidadPreferida": "media",
  "nivelBase": "intermedio"
}
```

### Obtener todas las configuraciones
```
GET /configuracion-usuario
```

### Obtener configuración por ID
```
GET /configuracion-usuario/:id
```

### Obtener configuración de un usuario
```
GET /configuracion-usuario/usuario/:usuarioId
```

### Actualizar configuración
```
PATCH /configuracion-usuario/:id
Body: { "tema": "claro", ... }
```

### Eliminar configuración
```
DELETE /configuracion-usuario/:id
```

---

## Estadísticas de Usuario
**Requiere autenticación**

### Crear estadística
```
POST /estadistica-usuario
Body: {
  "usuarioId": 1,
  "sesionesCompletadas": 5,
  "promedioPuntuacion": 85.5,
  "mejoraPorHabilidad": 15
}
```

### Obtener todas las estadísticas
```
GET /estadistica-usuario
```

### Obtener estadística por ID
```
GET /estadistica-usuario/:id
```

### Obtener estadística de un usuario
```
GET /estadistica-usuario/usuario/:usuarioId
```

### Actualizar estadística
```
PATCH /estadistica-usuario/:id
Body: { "sesionesCompletadas": 10, ... }
```

### Eliminar estadística
```
DELETE /estadistica-usuario/:id
```

---

## Actividades
**Requiere autenticación**

### Crear actividad
```
POST /actividad
Body: {
  "tipo": "memoria",
  "descripcion": "Juego de memoria visual",
  "nivelDificultad": "medio"
}
```

### Obtener todas las actividades
```
GET /actividad
```

### Obtener actividades por tipo
```
GET /actividad?tipo=memoria
```

### Obtener actividades por nivel
```
GET /actividad?nivel=medio
```

### Obtener actividad por ID
```
GET /actividad/:id
```

### Actualizar actividad
```
PATCH /actividad/:id
Body: { "nivelDificultad": "dificil", ... }
```

### Eliminar actividad
```
DELETE /actividad/:id
```

---

## Preguntas
**Requiere autenticación**

### Crear pregunta
```
POST /pregunta
Body: {
  "actividadId": 1,
  "enunciado": "¿Cuál es la capital de España?",
  "tipo": "multiple_choice",
  "opciones": ["Madrid", "Barcelona", "Valencia", "Sevilla"],
  "respuestaCorrecta": "Madrid"
}
```

### Obtener todas las preguntas
```
GET /pregunta
```

### Obtener pregunta por ID
```
GET /pregunta/:id
```

### Obtener preguntas de una actividad
```
GET /pregunta/actividad/:actividadId
```

### Actualizar pregunta
```
PATCH /pregunta/:id
Body: { "enunciado": "Nueva pregunta", ... }
```

### Eliminar pregunta
```
DELETE /pregunta/:id
```

---

## Sesiones de Entrenamiento
**Requiere autenticación**

### Crear sesión
```
POST /sesion-entrenamiento
Body: {
  "usuarioId": 1,
  "puntuacionTotal": 0
}
```

### Obtener todas las sesiones
```
GET /sesion-entrenamiento
```

### Obtener sesión por ID
```
GET /sesion-entrenamiento/:id
```

### Obtener sesiones de un usuario
```
GET /sesion-entrenamiento/usuario/:usuarioId
```

### Finalizar sesión
```
PATCH /sesion-entrenamiento/:id/finalizar
```

### Actualizar sesión
```
PATCH /sesion-entrenamiento/:id
Body: { "puntuacionTotal": 150, ... }
```

### Eliminar sesión
```
DELETE /sesion-entrenamiento/:id
```

---

## Resultados de Actividad
**Requiere autenticación**

### Crear resultado
```
POST /resultado-actividad
Body: {
  "usuarioId": 1,
  "actividadId": 1,
  "sesionEntrenamientoId": 1,
  "aciertos": 8,
  "errores": 2,
  "tiempoTotal": 300
}
```

### Obtener todos los resultados
```
GET /resultado-actividad
```

### Obtener resultado por ID
```
GET /resultado-actividad/:id
```

### Obtener resultados de un usuario
```
GET /resultado-actividad/usuario/:usuarioId
```

### Obtener resultados de una sesión
```
GET /resultado-actividad/sesion/:sesionId
```

### Obtener resultados de una actividad
```
GET /resultado-actividad/actividad/:actividadId
```

### Actualizar resultado
```
PATCH /resultado-actividad/:id
Body: { "aciertos": 9, ... }
```

### Eliminar resultado
```
DELETE /resultado-actividad/:id
```

---

## Relaciones Implementadas

Según el diagrama ER:

1. **USUARIO (1:1) CONFIGURACION_USUARIO**: Un usuario tiene una configuración única
2. **USUARIO (1:1) ESTADISTICA_USUARIO**: Un usuario tiene una estadística única
3. **USUARIO (1:N) SESION_ENTRENAMIENTO**: Un usuario puede tener muchas sesiones
4. **USUARIO (1:N) RESULTADO_ACTIVIDAD**: Un usuario puede tener muchos resultados
5. **ACTIVIDAD (1:N) PREGUNTA**: Una actividad puede tener muchas preguntas
6. **ACTIVIDAD (1:N) RESULTADO_ACTIVIDAD**: Una actividad puede tener muchos resultados
7. **SESION_ENTRENAMIENTO (1:N) RESULTADO_ACTIVIDAD**: Una sesión puede tener muchos resultados

---

## Estructura de la Base de Datos

Las siguientes tablas se crearán automáticamente:

- `USUARIO`
- `CONFIGURACION_USUARIO`
- `ESTADISTICA_USUARIO`
- `ACTIVIDAD`
- `PREGUNTA`
- `SESION_ENTRENAMIENTO`
- `RESULTADO_ACTIVIDAD`

---

## Cómo probar los endpoints

1. Iniciar el servidor:
```bash
npm run dev
```

2. Registrar un usuario:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "test@example.com",
    "password": "password123",
    "nombre": "Usuario Test",
    "roles": ["usuario"],
    "idiomaPreferido": "es",
    "nivelInicial": "principiante"
  }'
```

3. Hacer login y obtener el token:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "test@example.com",
    "password": "password123"
  }'
```

4. Usar el token para acceder a los endpoints protegidos:
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer {tu_token_aqui}"
```
