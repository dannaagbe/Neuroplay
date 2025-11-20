# Documentación API - Neuroplay

## Índice
1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
3. [Actividades](#actividades)
4. [Tipo de Actividad](#tipo-de-actividad)
5. [Nivel de Dificultad](#nivel-de-dificultad)
6. [Preguntas](#preguntas)
7. [Sesión de Entrenamiento](#sesión-de-entrenamiento)
8. [Resultado de Actividad](#resultado-de-actividad)
9. [Configuración de Usuario](#configuración-de-usuario)
10. [Estadísticas de Usuario](#estadísticas-de-usuario)

---

## Autenticación

### POST `/auth/login`
Inicia sesión de un usuario.

**Autenticación requerida:** No

**Body:**
```json
{
  "correo": "string (email válido)",
  "password": "string"
}
```

**Respuesta exitosa:**
```json
{
  "access_token": "string (JWT token)",
  "user": {
    "id": "number",
    "correo": "string",
    "nombre": "string",
    "rol": "ESTUDIANTE | DOCENTE"
  }
}
```

**Respuesta de error:**
```json
{
  "message": "Correo o password incorrectos"
}
```

---

### POST `/auth/register`
Registra un nuevo usuario.

**Autenticación requerida:** No

**Body:**
```json
{
  "rol": "ESTUDIANTE | DOCENTE (opcional)",
  "nombre": "string",
  "correo": "string (email válido)",
  "password": "string",
  "idiomaPreferido": "string",
  "nivelInicialId": "number (opcional, debe ser positivo)"
}
```

**Respuesta exitosa:**
```json
{
  "id": "number",
  "nombre": "string",
  "correo": "string",
  "rol": "string",
  "idiomaPreferido": "string"
}
```

---

## Usuarios

**Base URL:** `/users`

**Autenticación requerida:** Sí (JWT Token)

### GET `/users`
Obtiene todos los usuarios.

**Respuesta:**
```json
[
  {
    "id": "number",
    "nombre": "string",
    "correo": "string",
    "rol": "ESTUDIANTE | DOCENTE",
    "idiomaPreferido": "string",
    "nivelInicialId": "number"
  }
]
```

---

### GET `/users/:id`
Obtiene un usuario específico por ID.

**Parámetros:**
- `id` (path): ID del usuario

**Respuesta:**
```json
{
  "id": "number",
  "nombre": "string",
  "correo": "string",
  "rol": "ESTUDIANTE | DOCENTE",
  "idiomaPreferido": "string",
  "nivelInicialId": "number"
}
```

**Error:**
```json
{
  "statusCode": 400,
  "message": "Usuario no encontrado"
}
```

---

### POST `/users`
Crea un nuevo usuario.

**Body:**
```json
{
  "rol": "ESTUDIANTE | DOCENTE (opcional)",
  "nombre": "string",
  "correo": "string (email válido)",
  "password": "string",
  "idiomaPreferido": "string",
  "nivelInicialId": "number (opcional, debe ser positivo)"
}
```

---

### PUT `/users/:id`
Actualiza un usuario existente.

**Parámetros:**
- `id` (path): ID del usuario

**Body:** Todos los campos son opcionales
```json
{
  "rol": "ESTUDIANTE | DOCENTE (opcional)",
  "nombre": "string (opcional)",
  "correo": "string (opcional)",
  "password": "string (opcional)",
  "idiomaPreferido": "string (opcional)",
  "nivelInicialId": "number (opcional)"
}
```

---

### DELETE `/users/:id`
Elimina un usuario.

**Parámetros:**
- `id` (path): ID del usuario

**Respuesta:** 
- Status 200 (sin contenido)

---

## Actividades

**Base URL:** `/actividad`

**Autenticación requerida:** Sí (JWT Token)

### GET `/actividad`
Obtiene todas las actividades, con filtros opcionales.

**Query Parameters:**
- `tipoId` (opcional): Filtra por tipo de actividad
- `nivelDificultadId` (opcional): Filtra por nivel de dificultad

**Ejemplo:** `/actividad?tipoId=1&nivelDificultadId=2`

**Respuesta:**
```json
[
  {
    "id": "number",
    "tipoId": "number",
    "descripcion": "string",
    "nivelDificultadId": "number"
  }
]
```

---

### GET `/actividad/:id`
Obtiene una actividad específica por ID.

**Parámetros:**
- `id` (path): ID de la actividad

---

### POST `/actividad`
Crea una nueva actividad.

**Permisos:** Solo DOCENTE

**Body:**
```json
{
  "tipoId": "number (positivo, requerido)",
  "descripcion": "string (requerido)",
  "nivelDificultadId": "number (positivo, requerido)"
}
```

---

### PATCH `/actividad/:id`
Actualiza una actividad existente.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID de la actividad

**Body:** Todos los campos son opcionales
```json
{
  "tipoId": "number (opcional)",
  "descripcion": "string (opcional)",
  "nivelDificultadId": "number (opcional)"
}
```

---

### DELETE `/actividad/:id`
Elimina una actividad.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID de la actividad

---

## Tipo de Actividad

**Base URL:** `/tipo-actividad`

**Autenticación requerida:** Sí (JWT Token)

### GET `/tipo-actividad`
Obtiene todos los tipos de actividad.

**Respuesta:**
```json
[
  {
    "id": "number",
    "codigo": "string",
    "nombre": "string",
    "descripcion": "string"
  }
]
```

---

### GET `/tipo-actividad/:id`
Obtiene un tipo de actividad específico por ID.

**Parámetros:**
- `id` (path): ID del tipo de actividad

---

### POST `/tipo-actividad`
Crea un nuevo tipo de actividad.

**Permisos:** Solo DOCENTE

**Body:**
```json
{
  "codigo": "string (requerido)",
  "nombre": "string (requerido)",
  "descripcion": "string (opcional)"
}
```

---

### PATCH `/tipo-actividad/:id`
Actualiza un tipo de actividad existente.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID del tipo de actividad

**Body:** Todos los campos son opcionales
```json
{
  "codigo": "string (opcional)",
  "nombre": "string (opcional)",
  "descripcion": "string (opcional)"
}
```

---

### DELETE `/tipo-actividad/:id`
Elimina un tipo de actividad.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID del tipo de actividad

---

## Nivel de Dificultad

**Base URL:** `/nivel-dificultad`

**Autenticación requerida:** Sí (JWT Token)

### GET `/nivel-dificultad`
Obtiene todos los niveles de dificultad.

**Respuesta:**
```json
[
  {
    "id": "number",
    "codigo": "string",
    "nombre": "string",
    "descripcion": "string",
    "orden": "number"
  }
]
```

---

### GET `/nivel-dificultad/:id`
Obtiene un nivel de dificultad específico por ID.

**Parámetros:**
- `id` (path): ID del nivel de dificultad

---

### POST `/nivel-dificultad`
Crea un nuevo nivel de dificultad.

**Permisos:** Solo DOCENTE

**Body:**
```json
{
  "codigo": "string (requerido)",
  "nombre": "string (requerido)",
  "descripcion": "string (opcional)",
  "orden": "number (entero, opcional)"
}
```

---

### PATCH `/nivel-dificultad/:id`
Actualiza un nivel de dificultad existente.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID del nivel de dificultad

**Body:** Todos los campos son opcionales
```json
{
  "codigo": "string (opcional)",
  "nombre": "string (opcional)",
  "descripcion": "string (opcional)",
  "orden": "number (opcional)"
}
```

---

### DELETE `/nivel-dificultad/:id`
Elimina un nivel de dificultad.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID del nivel de dificultad

---

## Preguntas

**Base URL:** `/pregunta`

**Autenticación requerida:** Sí (JWT Token)

### GET `/pregunta`
Obtiene todas las preguntas.

**Respuesta:**
```json
[
  {
    "id": "number",
    "actividadId": "number",
    "enunciado": "string",
    "tipo": "string",
    "opciones": ["string"],
    "respuestaCorrecta": "string"
  }
]
```

---

### GET `/pregunta/:id`
Obtiene una pregunta específica por ID.

**Parámetros:**
- `id` (path): ID de la pregunta

---

### GET `/pregunta/actividad/:actividadId`
Obtiene todas las preguntas de una actividad específica.

**Parámetros:**
- `actividadId` (path): ID de la actividad

---

### POST `/pregunta`
Crea una nueva pregunta.

**Permisos:** Solo DOCENTE

**Body:**
```json
{
  "actividadId": "number (positivo, requerido)",
  "enunciado": "string (requerido)",
  "tipo": "string (requerido)",
  "opciones": ["string"] (array de strings, requerido)",
  "respuestaCorrecta": "string (requerido)"
}
```

---

### PATCH `/pregunta/:id`
Actualiza una pregunta existente.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID de la pregunta

**Body:** Todos los campos son opcionales
```json
{
  "actividadId": "number (opcional)",
  "enunciado": "string (opcional)",
  "tipo": "string (opcional)",
  "opciones": ["string"] (opcional)",
  "respuestaCorrecta": "string (opcional)"
}
```

---

### DELETE `/pregunta/:id`
Elimina una pregunta.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID de la pregunta

---

## Sesión de Entrenamiento

**Base URL:** `/sesion-entrenamiento`

**Autenticación requerida:** Sí (JWT Token)

### GET `/sesion-entrenamiento`
Obtiene todas las sesiones de entrenamiento.

**Respuesta:**
```json
[
  {
    "id": "number",
    "usuarioId": "number",
    "fechaInicio": "string (ISO date)",
    "fechaFin": "string (ISO date)",
    "puntuacionTotal": "number",
    "actividadId": "number"
  }
]
```

---

### GET `/sesion-entrenamiento/:id`
Obtiene una sesión de entrenamiento específica por ID.

**Parámetros:**
- `id` (path): ID de la sesión

---

### GET `/sesion-entrenamiento/usuario/:usuarioId`
Obtiene todas las sesiones de entrenamiento de un usuario específico.

**Parámetros:**
- `usuarioId` (path): ID del usuario

---

### POST `/sesion-entrenamiento`
Crea una nueva sesión de entrenamiento.

**Body:**
```json
{
  "usuarioId": "number (positivo, requerido)",
  "fechaInicio": "string (ISO date, requerido)",
  "fechaFin": "string (ISO date, opcional)",
  "puntuacionTotal": "number (opcional)",
  "actividadId": "number (positivo, requerido)"
}
```

---

### PATCH `/sesion-entrenamiento/:id`
Actualiza una sesión de entrenamiento existente.

**Parámetros:**
- `id` (path): ID de la sesión

**Body:** Todos los campos son opcionales
```json
{
  "usuarioId": "number (opcional)",
  "fechaInicio": "string (opcional)",
  "fechaFin": "string (opcional)",
  "puntuacionTotal": "number (opcional)",
  "actividadId": "number (opcional)"
}
```

---

### PATCH `/sesion-entrenamiento/:id/finalizar`
Finaliza una sesión de entrenamiento (marca la fecha de fin).

**Parámetros:**
- `id` (path): ID de la sesión

---

### DELETE `/sesion-entrenamiento/:id`
Elimina una sesión de entrenamiento.

**Parámetros:**
- `id` (path): ID de la sesión

---

## Resultado de Actividad

**Base URL:** `/resultado-actividad`

**Autenticación requerida:** Sí (JWT Token)

### GET `/resultado-actividad`
Obtiene resultados de actividades.

**Comportamiento:**
- **DOCENTE:** Obtiene todos los resultados
- **ESTUDIANTE:** Obtiene solo sus propios resultados

**Respuesta:**
```json
[
  {
    "id": "number",
    "usuarioId": "number",
    "sesionEntrenamientoId": "number",
    "aciertos": "number",
    "errores": "number",
    "tiempoTotal": "number",
    "fecha": "string (ISO date)"
  }
]
```

---

### GET `/resultado-actividad/:id`
Obtiene un resultado específico por ID.

**Parámetros:**
- `id` (path): ID del resultado

**Restricciones:**
- Los estudiantes solo pueden ver sus propios resultados
- Los docentes pueden ver cualquier resultado

---

### GET `/resultado-actividad/usuario/:usuarioId`
Obtiene todos los resultados de un usuario específico.

**Parámetros:**
- `usuarioId` (path): ID del usuario

**Restricciones:**
- Los estudiantes solo pueden consultar sus propios resultados
- Los docentes pueden consultar resultados de cualquier usuario

---

### GET `/resultado-actividad/sesion/:sesionId`
Obtiene todos los resultados de una sesión específica.

**Parámetros:**
- `sesionId` (path): ID de la sesión

**Restricciones:**
- Los estudiantes solo ven sus propios resultados de la sesión
- Los docentes ven todos los resultados de la sesión

---

### POST `/resultado-actividad`
Crea un nuevo resultado de actividad.

**Body:**
```json
{
  "usuarioId": "number (positivo, requerido)",
  "sesionEntrenamientoId": "number (positivo, requerido)",
  "aciertos": "number (opcional)",
  "errores": "number (opcional)",
  "tiempoTotal": "number (opcional)",
  "fecha": "string (ISO date, requerido)"
}
```

---

### PATCH `/resultado-actividad/:id`
Actualiza un resultado de actividad.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID del resultado

**Body:** Todos los campos son opcionales
```json
{
  "usuarioId": "number (opcional)",
  "sesionEntrenamientoId": "number (opcional)",
  "aciertos": "number (opcional)",
  "errores": "number (opcional)",
  "tiempoTotal": "number (opcional)",
  "fecha": "string (opcional)"
}
```

---

### DELETE `/resultado-actividad/:id`
Elimina un resultado de actividad.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID del resultado

---

## Configuración de Usuario

**Base URL:** `/configuracion-usuario`

**Autenticación requerida:** Sí (JWT Token)

### GET `/configuracion-usuario`
Obtiene todas las configuraciones de usuario.

**Respuesta:**
```json
[
  {
    "id": "number",
    "usuarioId": "number",
    "tema": "string",
    "idioma": "string",
    "velocidadPreferida": "string",
    "nivelBase": "string"
  }
]
```

---

### GET `/configuracion-usuario/:id`
Obtiene una configuración específica por ID.

**Parámetros:**
- `id` (path): ID de la configuración

---

### GET `/configuracion-usuario/usuario/:usuarioId`
Obtiene la configuración de un usuario específico.

**Parámetros:**
- `usuarioId` (path): ID del usuario

---

### POST `/configuracion-usuario`
Crea una nueva configuración de usuario.

**Body:**
```json
{
  "usuarioId": "number (positivo, requerido)",
  "tema": "string (requerido)",
  "idioma": "string (requerido)",
  "velocidadPreferida": "string (requerido)",
  "nivelBase": "string (requerido)"
}
```

---

### PATCH `/configuracion-usuario/:id`
Actualiza una configuración de usuario.

**Parámetros:**
- `id` (path): ID de la configuración

**Body:** Todos los campos son opcionales
```json
{
  "usuarioId": "number (opcional)",
  "tema": "string (opcional)",
  "idioma": "string (opcional)",
  "velocidadPreferida": "string (opcional)",
  "nivelBase": "string (opcional)"
}
```

---

### DELETE `/configuracion-usuario/:id`
Elimina una configuración de usuario.

**Parámetros:**
- `id` (path): ID de la configuración

---

## Estadísticas de Usuario

**Base URL:** `/estadistica-usuario`

**Autenticación requerida:** Sí (JWT Token)

### GET `/estadistica-usuario`
Obtiene estadísticas de usuarios.

**Comportamiento:**
- **DOCENTE:** Obtiene todas las estadísticas
- **ESTUDIANTE:** Obtiene solo sus propias estadísticas

**Respuesta:**
```json
[
  {
    "id": "number",
    "usuarioId": "number",
    "sesionesCompletadas": "number (entero)",
    "promedioPuntuacion": "number",
    "mejoraPorHabilidad": "number (entero)"
  }
]
```

---

### GET `/estadistica-usuario/:id`
Obtiene una estadística específica por ID.

**Parámetros:**
- `id` (path): ID de la estadística

**Restricciones:**
- Los estudiantes solo pueden ver sus propias estadísticas
- Los docentes pueden ver cualquier estadística

---

### GET `/estadistica-usuario/usuario/:usuarioId`
Obtiene las estadísticas de un usuario específico.

**Parámetros:**
- `usuarioId` (path): ID del usuario

**Restricciones:**
- Los estudiantes solo pueden consultar sus propias estadísticas
- Los docentes pueden consultar estadísticas de cualquier usuario

---

### POST `/estadistica-usuario`
Crea nuevas estadísticas de usuario.

**Permisos:** Solo DOCENTE

**Body:**
```json
{
  "usuarioId": "number (positivo, requerido)",
  "sesionesCompletadas": "number (entero positivo, requerido)",
  "promedioPuntuacion": "number (positivo, requerido)",
  "mejoraPorHabilidad": "number (entero positivo, requerido)"
}
```

---

### PATCH `/estadistica-usuario/:id`
Actualiza estadísticas de un usuario.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID de la estadística

**Body:** Todos los campos son opcionales
```json
{
  "usuarioId": "number (opcional)",
  "sesionesCompletadas": "number (opcional)",
  "promedioPuntuacion": "number (opcional)",
  "mejoraPorHabilidad": "number (opcional)"
}
```

---

### DELETE `/estadistica-usuario/:id`
Elimina estadísticas de un usuario.

**Permisos:** Solo DOCENTE

**Parámetros:**
- `id` (path): ID de la estadística

---

## Autenticación y Autorización

### Headers requeridos
Todos los endpoints (excepto `/auth/login` y `/auth/register`) requieren el siguiente header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Roles de Usuario
- **ESTUDIANTE**: Usuario regular con acceso limitado a sus propios datos
- **DOCENTE**: Usuario administrador con acceso completo y permisos para crear/editar/eliminar recursos

### Guards de Seguridad
- **JwtAuthGuard**: Verifica que el usuario esté autenticado
- **DocenteGuard**: Verifica que el usuario tenga rol de DOCENTE

---

## Validaciones Comunes

### Campos de Email
- Deben ser direcciones de correo electrónico válidas
- Validación con `@IsEmail()`

### Campos Numéricos Positivos
- Deben ser números mayores a 0
- Validación con `@IsPositive()`

### Campos de Tipo String
- No pueden estar vacíos
- Validación con `@IsNotEmpty()` y `@IsString()`

### Campos de Fecha
- Formato ISO 8601 (ejemplo: "2023-11-19T12:00:00Z")
- Validación con `@IsDateString()`

### Campos Enteros
- Deben ser números sin decimales
- Validación con `@IsInt()`

---

## Códigos de Respuesta HTTP

### Éxito
- **200 OK**: Operación exitosa (GET, PUT, PATCH, DELETE)
- **201 Created**: Recurso creado exitosamente (POST)

### Errores del Cliente
- **400 Bad Request**: Datos inválidos o faltantes
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: No autorizado para realizar la acción
- **404 Not Found**: Recurso no encontrado

### Errores del Servidor
- **500 Internal Server Error**: Error interno del servidor

---

## Notas Adicionales

1. **Paginación**: Actualmente no implementada en los endpoints GET que retornan listas
2. **Filtros**: Solo disponible en el endpoint `/actividad` con query parameters
3. **Soft Delete**: No implementado, las eliminaciones son permanentes
4. **Timestamps**: Las entidades incluyen campos `createdAt` y `updatedAt` automáticamente

---

## Ejemplos de Uso

### Flujo de Autenticación
```bash
# 1. Registrar un usuario
POST /auth/register
{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "password": "password123",
  "idiomaPreferido": "es"
}

# 2. Iniciar sesión
POST /auth/login
{
  "correo": "juan@example.com",
  "password": "password123"
}

# Respuesta
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}

# 3. Usar el token en requests posteriores
GET /actividad
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Crear una Actividad Completa
```bash
# 1. Crear nivel de dificultad (como DOCENTE)
POST /nivel-dificultad
{
  "codigo": "FACIL",
  "nombre": "Fácil",
  "descripcion": "Nivel para principiantes",
  "orden": 1
}

# 2. Crear tipo de actividad (como DOCENTE)
POST /tipo-actividad
{
  "codigo": "MEMORIA",
  "nombre": "Memoria",
  "descripcion": "Ejercicios de memoria"
}

# 3. Crear actividad (como DOCENTE)
POST /actividad
{
  "tipoId": 1,
  "descripcion": "Ejercicio de memoria básico",
  "nivelDificultadId": 1
}

# 4. Crear preguntas para la actividad (como DOCENTE)
POST /pregunta
{
  "actividadId": 1,
  "enunciado": "¿Cuál es la capital de España?",
  "tipo": "multiple_choice",
  "opciones": ["Madrid", "Barcelona", "Valencia", "Sevilla"],
  "respuestaCorrecta": "Madrid"
}
```

### Completar una Sesión de Entrenamiento
```bash
# 1. Crear sesión
POST /sesion-entrenamiento
{
  "usuarioId": 1,
  "fechaInicio": "2023-11-19T10:00:00Z",
  "actividadId": 1
}

# 2. Registrar resultados
POST /resultado-actividad
{
  "usuarioId": 1,
  "sesionEntrenamientoId": 1,
  "aciertos": 8,
  "errores": 2,
  "tiempoTotal": 300,
  "fecha": "2023-11-19T10:05:00Z"
}

# 3. Finalizar sesión
PATCH /sesion-entrenamiento/1/finalizar
```

---

## Contacto y Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo de Neuroplay.

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2025
