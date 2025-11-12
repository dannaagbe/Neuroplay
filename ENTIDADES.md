# Diagrama de Entidades - Neuroplay

Este documento describe las entidades implementadas según el diagrama ER proporcionado.

## Entidades

### 1. USUARIO
**Ubicación**: `src/users/user.entity.ts`

Campos:
- `id` (PK) - number
- `roles` - string[]
- `nombre` - string
- `correo` - string (único)
- `password` - string
- `idiomaPreferido` - string
- `nivelInicial` - string

Relaciones:
- OneToOne con ConfiguracionUsuario
- OneToOne con EstadisticaUsuario
- OneToMany con SesionEntrenamiento
- OneToMany con ResultadoActividad

---

### 2. CONFIGURACION_USUARIO
**Ubicación**: `src/configuracion-usuario/configuracion-usuario.entity.ts`

Campos:
- `id` (PK) - number
- `usuarioId` (FK) - number
- `tema` - string
- `idioma` - string
- `velocidadPreferida` - string
- `nivelBase` - string

Relaciones:
- OneToOne con Usuario

---

### 3. ESTADISTICA_USUARIO
**Ubicación**: `src/estadistica-usuario/estadistica-usuario.entity.ts`

Campos:
- `id` (PK) - number
- `usuarioId` (FK) - number
- `sesionesCompletadas` - number (default: 0)
- `promedioPuntuacion` - decimal (default: 0)
- `mejoraPorHabilidad` - number (default: 0)

Relaciones:
- OneToOne con Usuario

---

### 4. ACTIVIDAD
**Ubicación**: `src/actividad/actividad.entity.ts`

Campos:
- `id` (PK) - number
- `tipo` - string
- `descripcion` - text
- `nivelDificultad` - string

Relaciones:
- OneToMany con Pregunta
- OneToMany con ResultadoActividad

---

### 5. PREGUNTA
**Ubicación**: `src/pregunta/pregunta.entity.ts`

Campos:
- `id` (PK) - number
- `actividadId` (FK) - number
- `enunciado` - text
- `tipo` - string
- `opciones` - string[] (JSON)
- `respuestaCorrecta` - string

Relaciones:
- ManyToOne con Actividad

---

### 6. SESION_ENTRENAMIENTO
**Ubicación**: `src/sesion-entrenamiento/sesion-entrenamiento.entity.ts`

Campos:
- `id` (PK) - number
- `usuarioId` (FK) - number
- `fechaInicio` - Date
- `fechaFin` - Date (nullable)
- `puntuacionTotal` - number (default: 0)

Relaciones:
- ManyToOne con Usuario
- OneToMany con ResultadoActividad

---

### 7. RESULTADO_ACTIVIDAD
**Ubicación**: `src/resultado-actividad/resultado-actividad.entity.ts`

Campos:
- `id` (PK) - number
- `usuarioId` (FK) - number
- `actividadId` (FK) - number
- `sesionEntrenamientoId` (FK) - number
- `aciertos` - number (default: 0)
- `errores` - number (default: 0)
- `tiempoTotal` - number (default: 0)
- `fecha` - Date

Relaciones:
- ManyToOne con Usuario
- ManyToOne con Actividad
- ManyToOne con SesionEntrenamiento

---

## Módulos Implementados

Cada entidad tiene su módulo completo con:

1. **Entity** - Definición de la entidad y relaciones
2. **Service** - Lógica de negocio (CRUD completo)
3. **Controller** - Endpoints REST
4. **Module** - Configuración del módulo

### Módulos:
- `ConfiguracionUsuarioModule` - `/configuracion-usuario`
- `EstadisticaUsuarioModule` - `/estadistica-usuario`
- `ActividadModule` - `/actividad`
- `PreguntaModule` - `/pregunta`
- `SesionEntrenamientoModule` - `/sesion-entrenamiento`
- `ResultadoActividadModule` - `/resultado-actividad`
- `UsersModule` - `/users` (ya existía, actualizado)
- `AuthModule` - `/auth` (ya existía)

---

## Características Implementadas

### Autenticación y Seguridad
- Todos los endpoints (excepto `/auth/register` y `/auth/login`) están protegidos con JWT
- Guard `JwtAuthGuard` aplicado a todos los controladores

### Operaciones CRUD Completas
Cada módulo incluye:
- `create()` - Crear nuevo registro
- `findAll()` - Obtener todos los registros
- `findOne()` - Obtener un registro por ID
- `update()` - Actualizar registro
- `remove()` - Eliminar registro

### Búsquedas Adicionales
- Configuración y Estadística por Usuario
- Preguntas por Actividad
- Sesiones por Usuario
- Resultados por Usuario, Sesión o Actividad
- Actividades por Tipo o Nivel de Dificultad

### Operaciones Especiales
- `finalizarSesion()` - Marca la fecha de fin de una sesión
- Creación automática de fechas en Sesiones y Resultados

---

## Base de Datos

La configuración de TypeORM está en `src/app.module.ts` con:
- `synchronize: true` - Las tablas se crean automáticamente
- Soporte para MySQL
- Todas las entidades se cargan automáticamente

Configuración en `.env`:
```
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=danna
DB_HOST=localhost
DB_PORT=3306
```
