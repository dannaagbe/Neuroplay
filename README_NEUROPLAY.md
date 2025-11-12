# Neuroplay - API Backend

API REST desarrollada con NestJS para la plataforma de entrenamiento cognitivo Neuroplay.

## 🚀 Características

- **Autenticación JWT**: Sistema completo de registro y login
- **7 Entidades principales** con relaciones completas según diagrama ER
- **CRUD completo** para todas las entidades
- **Endpoints protegidos** con guards de autenticación
- **TypeORM** para gestión de base de datos MySQL
- **Validación** de datos y manejo de errores

## 📋 Entidades Implementadas

### 1. Usuario
- Gestión de usuarios con roles
- Autenticación y autorización
- Relaciones: 1:1 con Configuración y Estadística, 1:N con Sesiones y Resultados

### 2. Configuración de Usuario
- Preferencias personalizadas (tema, idioma, velocidad, nivel base)
- Relación 1:1 con Usuario

### 3. Estadísticas de Usuario
- Seguimiento de progreso (sesiones completadas, promedio puntuación, mejoras)
- Relación 1:1 con Usuario

### 4. Actividad
- Diferentes tipos de ejercicios cognitivos
- Niveles de dificultad configurables
- Relación 1:N con Preguntas y Resultados

### 5. Pregunta
- Preguntas asociadas a actividades
- Múltiples tipos de respuesta
- Opciones en formato JSON
- Relación N:1 con Actividad

### 6. Sesión de Entrenamiento
- Control de sesiones de práctica
- Tracking de tiempo y puntuación
- Relación N:1 con Usuario y 1:N con Resultados

### 7. Resultado de Actividad
- Almacenamiento de resultados detallados
- Métricas de aciertos, errores y tiempo
- Relaciona Usuario, Actividad y Sesión (N:1 con cada uno)

## 🗂️ Estructura del Proyecto

```
src/
├── auth/                          # Autenticación JWT
├── users/                         # Gestión de usuarios  
├── configuracion-usuario/         # Configuración de usuario
├── estadistica-usuario/           # Estadísticas
├── actividad/                     # Actividades
├── pregunta/                      # Preguntas
├── sesion-entrenamiento/          # Sesiones
├── resultado-actividad/           # Resultados
├── app.module.ts                  # Módulo principal
└── main.ts                        # Entry point
```

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env`:
```env
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=danna
DB_HOST=localhost
DB_PORT=3306
```

3. Asegurarse de que MySQL está corriendo y la base de datos existe:
```sql
CREATE DATABASE danna;
```

## 🚀 Ejecución

### Modo desarrollo (recomendado)
```bash
npm run dev
```

### Otros comandos
```bash
npm run start          # Iniciar aplicación
npm run build          # Compilar para producción
npm run start:prod     # Modo producción
npm run lint           # Ejecutar linter
npm run format         # Formatear código
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación Completa

- **[API_ENDPOINTS.md](./API_ENDPOINTS.md)** - Documentación completa de todos los endpoints con ejemplos
- **[ENTIDADES.md](./ENTIDADES.md)** - Detalles sobre las entidades, campos y relaciones
- **[DOCUMENTACION.md](./DOCUMENTACION.md)** - Documentación adicional del proyecto

## 🔐 Autenticación Rápida

### Registro
```bash
POST /auth/register
{
  "correo": "usuario@example.com",
  "password": "password123",
  "nombre": "Juan Pérez",
  "roles": ["usuario"],
  "idiomaPreferido": "es",
  "nivelInicial": "principiante"
}
```

### Login
```bash
POST /auth/login
{
  "correo": "usuario@example.com",
  "password": "password123"
}
```

### Uso del Token
```bash
Authorization: Bearer {access_token}
```

## 📊 Endpoints Principales

Todos los endpoints (excepto `/auth/register` y `/auth/login`) requieren autenticación JWT.

| Módulo | Endpoint Base | Operaciones |
|--------|---------------|-------------|
| Auth | `/auth` | register, login |
| Usuarios | `/users` | CRUD completo |
| Configuración | `/configuracion-usuario` | CRUD + by usuario |
| Estadísticas | `/estadistica-usuario` | CRUD + by usuario |
| Actividades | `/actividad` | CRUD + by tipo/nivel |
| Preguntas | `/pregunta` | CRUD + by actividad |
| Sesiones | `/sesion-entrenamiento` | CRUD + by usuario + finalizar |
| Resultados | `/resultado-actividad` | CRUD + by usuario/sesión/actividad |

## 🔄 Flujo de Trabajo Típico

1. **Registro**: `POST /auth/register`
2. **Login**: `POST /auth/login` → Obtener token
3. **Crear configuración**: `POST /configuracion-usuario`
4. **Crear estadística inicial**: `POST /estadistica-usuario`
5. **Obtener actividades**: `GET /actividad?nivel=medio`
6. **Iniciar sesión de entrenamiento**: `POST /sesion-entrenamiento`
7. **Registrar resultados**: `POST /resultado-actividad`
8. **Finalizar sesión**: `PATCH /sesion-entrenamiento/:id/finalizar`
9. **Ver estadísticas actualizadas**: `GET /estadistica-usuario/usuario/:usuarioId`

## 🛠️ Tecnologías

- **NestJS 11** - Framework de Node.js
- **TypeORM 0.3** - ORM para TypeScript
- **MySQL 2** - Base de datos
- **Passport JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **class-validator** - Validación de datos

## 📈 Diagrama de Relaciones

```
USUARIO (1:1) → CONFIGURACION_USUARIO
USUARIO (1:1) → ESTADISTICA_USUARIO
USUARIO (1:N) → SESION_ENTRENAMIENTO
USUARIO (1:N) → RESULTADO_ACTIVIDAD

ACTIVIDAD (1:N) → PREGUNTA
ACTIVIDAD (1:N) → RESULTADO_ACTIVIDAD

SESION_ENTRENAMIENTO (1:N) → RESULTADO_ACTIVIDAD
```

## 🧪 Testing

```bash
npm run test           # Tests unitarios
npm run test:e2e       # Tests end-to-end
npm run test:cov       # Cobertura
```

## 📝 Notas Importantes

- Las tablas se crean automáticamente con `synchronize: true` en TypeORM
- Todos los endpoints están protegidos con JWT excepto los de autenticación
- Las contraseñas se encriptan automáticamente con bcrypt
- Las fechas se generan automáticamente en Sesiones y Resultados

## 📄 Licencia

UNLICENSED - Proyecto privado

---

Desarrollado para Neuroplay 🧠
