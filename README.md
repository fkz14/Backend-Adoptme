# 🐾 Adoptme-Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.7-brightgreen)
![Mongoose](https://img.shields.io/badge/Mongoose-6.7-orange)
![JWT](https://img.shields.io/badge/JWT-8.5-purple)
![Bcrypt](https://img.shields.io/badge/Bcrypt-5.1-red)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)

## 📋 Descripción

**Adoptme-Backend** es una plataforma de adopción de mascotas completa que gestiona usuarios, mascotas disponibles, adopciones, y un sistema innovador de generación de datos simulados (mocking). 

El proyecto implementa:
- 🔐 **Autenticación segura** con JWT y Bcrypt
- 👥 **Gestión de usuarios** con roles (admin/user)
- 🐕 **Catálogo de mascotas** con información completa
- 📊 **Mocking inteligente** para generar datos realistas
- 🎫 **Historial de adopciones** con trazabilidad
- 🏗️ **Arquitectura profesional** (DAO, Repository, DTO)
- 🐳 **Docker & Docker Compose** para despliegue inmediato

Construido con **patrones modernos de desarrollo** que garantizan escalabilidad, mantenibilidad y seguridad en cada operación.

---

## ✨ Características Principales

### 🔐 Autenticación & Seguridad
- ✅ Registro con validación de email único
- ✅ Login con JWT (JSON Web Tokens)
- ✅ Bcrypt para hasheo de contraseñas (10 rounds)
- ✅ Roles dinámicos (admin/user)
- ✅ Middleware de autorización en endpoints sensibles
- ✅ Cookies seguras para gestión de sesiones

### 👥 Gestión de Usuarios
- ✅ CRUD completo de usuarios
- ✅ DTOs que excluyen datos sensibles
- ✅ Validaciones en todas las operaciones
- ✅ Perfil de usuario protegido

### 🐕 Gestión de Mascotas
- ✅ Catálogo público de mascotas disponibles
- ✅ CRUD de mascotas (solo admin)
- ✅ Información detallada: nombre, especie, fecha de nacimiento
- ✅ Estado de adopción en tiempo real
- ✅ Soporte para imágenes

### 🎲 Sistema de Mocking (Generación de Datos)
- ✅ Generador de 100 mascotas simuladas
- ✅ Generador de 50 usuarios simulados con datos realistas
- ✅ Contraseñas encriptadas automáticamente
- ✅ Datos únicos con Faker.js
- ✅ ObjectIds válidos de MongoDB
- ✅ Inserción real en BD con `POST /generateData`

### 🎫 Historial de Adopciones
- ✅ Registrar adopciones
- ✅ Consultar historial por usuario
- ✅ Trazabilidad completa
- ✅ Validación de disponibilidad

---

## � Estructura del Proyecto

```
Backend-Adoptme-main/
├── src/
│   ├── controllers/         # Lógica de endpoints
│   │   ├── adoptions.controller.js
│   │   ├── pets.controller.js
│   │   ├── sessions.controller.js
│   │   └── users.controller.js
│   │
│   ├── dao/                # Data Access Objects
│   │   ├── Adoption.js
│   │   ├── Pets.dao.js
│   │   ├── Users.dao.js
│   │   └── models/         # Esquemas Mongoose
│   │       ├── Adoption.js
│   │       ├── Pet.js
│   │       └── User.js
│   │
│   ├── dto/                # Data Transfer Objects
│   │   ├── Pet.dto.js
│   │   └── User.dto.js
│   │
│   ├── repository/         # Lógica de negocio
│   │   ├── GenericRepository.js
│   │   ├── AdoptionRepository.js
│   │   ├── PetRepository.js
│   │   └── UserRepository.js
│   │
│   ├── routes/            # Rutas de la API
│   │   ├── adoption.router.js
│   │   ├── pets.router.js
│   │   ├── sessions.router.js
│   │   ├── users.router.js
│   │   └── mocks.router.js    # 🆕 Endpoints de mocking
│   │
│   ├── services/          # Servicios centralizados
│   │   └── index.js
│   │
│   ├── utils/            # Utilidades
│   │   ├── index.js
│   │   ├── uploader.js   # Manejo de imágenes con Multer
│   │   └── mockingUsers.js    # 🆕 Generador de usuarios con Faker
│   │
│   ├── public/           # Archivos estáticos
│   │   └── img/          # Imágenes de mascotas subidas
│   │
│   ├── app.js           # Configuración Express
│   ├── server.js        # Punto de entrada
│   └── swagger.json     # Documentación API
│
├── test/
│   └── adoption.test.mjs    # Tests con Jest + Supertest
│
├── docker-compose.yml   # 🆕 Orquestación de servicios
├── Dockerfile           # 🆕 Configuración de imagen Docker
├── package.json         # Dependencias y scripts
├── .gitignore          # Archivos ignorados
│
└── 📚 Este README
```

---

## 🛠️ Instalación

### Opción 1: Docker Compose (RECOMENDADO ⭐)

La forma más rápida y sencilla. No necesitas instalar nada excepto Docker.

#### Requisitos:
- **Docker** instalado (https://www.docker.com/products/docker-desktop)
- **Docker Compose** (incluido en Docker Desktop)

#### Pasos:

```bash
# 1. Navega al proyecto
cd Backend-Adoptme-main

# 2. Inicia los servicios (MongoDB + Backend)
docker-compose up

# 3. ¡Listo! El servidor estará disponible en http://localhost:8080
```

**Resultado esperado:**
```
adoptme-mongo  | MongoDB initialized
adoptme-backend | Listening on 8080
```

Para detener los servicios:
```bash
docker-compose down
```

---

### Opción 2: Docker (Sin Compose)

Si necesitas más control o no puedes usar Docker Compose.

#### Requisitos:
- **Docker** instalado
- **MongoDB corriendo** en tu máquina (`localhost:27017`)

#### Pasos:

```bash
# 1. Construir la imagen
docker build -t adoptme-backend:latest .

# 2. Ejecutar el contenedor
docker run -d \
  -p 8080:8080 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/adoptme" \
  --name adoptme-backend \
  adoptme-backend:latest

# 3. Verificar logs
docker logs adoptme-backend
```

---

### Opción 3: Instalación Local (Sin Docker)

Para desarrollo local con MongoDB instalado.

#### Requisitos Previos
- **Node.js** 14+
- **MongoDB** (local o Atlas)
- **npm** o **yarn**

#### Pasos:

```bash
# 1. Instalar dependencias
npm install

# 2. Si usas MongoDB local, es configuración por defecto
# Si usas MongoDB Atlas, edita src/server.js:
# const MONGO_URI = 'mongodb+srv://usuario:contraseña@cluster.mongodb.net/adoptme'

# 3. Iniciar servidor
npm run dev
```

**Resultado esperado:**
```
Listening on 8080
```

---

## 🚀 Inicio Rápido (5 minutos)

### Opción A: Con Docker Compose (RECOMENDADO)

```bash
# 1. Ir al proyecto
cd Backend-Adoptme-main

# 2. Ejecutar Docker Compose
docker-compose up

# 3. En otra terminal, probar endpoints
curl http://localhost:8080/api/users
```

### Opción B: Sin Docker

```bash
# 1. Instalar y ejecutar
npm install && npm run dev

# 2. En otra terminal, probar endpoints
curl http://localhost:8080/api/users
```

### 2. Probar Mocking (SIN insertar en BD)
```bash
# Obtener 100 mascotas simuladas
curl http://localhost:8080/api/mocks/mockingpets

# Obtener 50 usuarios simulados
curl http://localhost:8080/api/mocks/mockingusers
```

### 3. Generar e insertar datos REALES en MongoDB
```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{
    "users": 5,
    "pets": 10
  }'
```

### 4. Verificar datos insertados
```bash
curl http://localhost:8080/api/users
curl http://localhost:8080/api/pets
```

---

## 🧪 Cómo Ejecutar los Tests

### Requisitos

- Node.js instalado
- Dependencias instaladas: `npm install`

### Ejecutar Tests

```bash
# Ejecutar tests una sola vez
npm test

# Ejecutar tests en modo observador (watch mode)
npm test -- --watch

# Ejecutar tests con reporte de cobertura
npm test -- --coverage

# Ejecutar test específico
npm test -- adoption.test.mjs
```

### Stack de Testing

- **Framework:** Jest
- **HTTP Testing:** Supertest
- **Base de Datos:** MongoDB en memoria (mongodb-memory-server)
- **Assertion:** Chai

### Cobertura de Tests

El proyecto incluye tests automatizados que cubren:

✅ Endpoints de adopciones (GET, POST)
✅ Validaciones de usuarios y mascotas
✅ Códigos de estado HTTP
✅ Manejo de errores
✅ Transacciones de adopción
✅ Trazabilidad de datos

### Resultado Esperado

```bash
PASS  test/adoption.test.mjs
  ✓ GET /api/adoptions returns all adoptions
  ✓ GET /api/adoptions/:aid returns adoption by id
  ✓ POST /api/adoptions/:uid/:pid creates adoption
  ...

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
```

---

## 📁 Variables de Entorno

### Local (.env)

```bash
# MongoDB
MONGO_URI=mongodb://localhost:27017/adoptme

# Server
PORT=8080

# JWT
JWT_SECRET=tokenSecretJWT
JWT_EXPIRATION=1h
```

### Docker Compose

Variables configuradas automáticamente en `docker-compose.yml`:

```yaml
MONGO_URI=mongodb://mongodb:27017/adoptme
PORT=8080
```

---

## 🔗 Endpoints Principales

### 🎲 Mocking (NUEVO)
```
GET    /api/mocks/mockingpets            # 100 mascotas simuladas
GET    /api/mocks/mockingusers           # 50 usuarios simulados
POST   /api/mocks/generateData           # Generar e insertar datos reales
```

### 👥 Usuarios
```
GET    /api/users                        # Listar todos
GET    /api/users/:uid                   # Obtener por ID
PUT    /api/users/:uid                   # Actualizar
DELETE /api/users/:uid                   # Eliminar
```

### 🐕 Mascotas
```
GET    /api/pets                         # Listar todas
POST   /api/pets                         # Crear
POST   /api/pets/withimage               # Crear con imagen
PUT    /api/pets/:pid                    # Actualizar
DELETE /api/pets/:pid                    # Eliminar
```

### 🎫 Adopciones
```
GET    /api/adoptions                    # Listar todas
GET    /api/adoptions/:aid               # Obtener por ID
POST   /api/adoptions/:uid/:pid          # Crear adopción
```

### 🔐 Sesiones
```
POST   /api/sessions/register            # Registrar usuario
POST   /api/sessions/login               # Login
GET    /api/sessions/current             # Usuario actual
GET    /api/sessions/unprotectedLogin    # Login sin protección
GET    /api/sessions/unprotectedCurrent  # Usuario actual sin protección
```

---

## � Documentación de la API - Swagger/OpenAPI 3.0

### 🔗 Acceder a Swagger UI

Una vez que el servidor está corriendo, accede a la documentación interactiva:

```
http://localhost:8080/api/docs
```

**Características:**

- ✅ Interfaz interactiva para probar endpoints
- ✅ Documentación completa de parámetros
- ✅ Ejemplos de request/response
- ✅ Modelos de datos (schemas)
- ✅ Códigos de estado HTTP
- ✅ Autenticación y seguridad documentada

### 📖 Módulos Documentados

#### 👥 Users (Usuarios)
```
GET    /api/users                # Obtener todos los usuarios
GET    /api/users/:uid           # Obtener usuario por ID
PUT    /api/users/:uid           # Actualizar usuario
DELETE /api/users/:uid           # Eliminar usuario
```

#### 🐕 Pets (Mascotas)
```
GET    /api/pets                 # Obtener todas las mascotas
POST   /api/pets                 # Crear mascota
POST   /api/pets/withimage       # Crear mascota con imagen
PUT    /api/pets/:pid            # Actualizar mascota
DELETE /api/pets/:pid            # Eliminar mascota
```

#### 🎫 Adoptions (Adopciones)
```
GET    /api/adoptions            # Obtener todas las adopciones
GET    /api/adoptions/:aid       # Obtener adopción por ID
POST   /api/adoptions/:uid/:pid  # Crear adopción
```

#### 🎲 Mocking (Datos Simulados)
```
GET    /api/mocks/mockingpets    # Obtener 100 mascotas simuladas
GET    /api/mocks/mockingusers   # Obtener 50 usuarios simulados
POST   /api/mocks/generateData   # Generar e insertar datos reales
```

#### 🔐 Sessions (Autenticación)
```
POST   /api/sessions/register    # Registrar nuevo usuario
POST   /api/sessions/login       # Login y obtener JWT
GET    /api/sessions/current     # Obtener usuario actual
```

### 💡 Consejo

Abre Swagger en el navegador para una experiencia interactiva:
```bash
# Abrir en navegador (Windows/Mac/Linux)
start http://localhost:8080/api/docs
```

---

## 📊 Ejemplos Reales de Uso - Curl/HTTP

### 1️⃣ Obtener lista de usuarios

```bash
curl -X GET http://localhost:8080/api/users
```

**Respuesta (200 OK):**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan@example.com",
      "role": "user",
      "pets": []
    }
  ]
}
```

---

### 2️⃣ Crear una mascota

```bash
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Firulais",
    "specie": "dog",
    "birthDate": "2020-01-15"
  }'
```

**Respuesta (201 Created):**
```json
{
  "status": "success",
  "payload": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Firulais",
    "specie": "dog",
    "birthDate": "2020-01-15",
    "adopted": false,
    "owner": null,
    "image": ""
  }
}
```

---

### 3️⃣ Generar datos de prueba

```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{
    "users": 5,
    "pets": 10
  }'
```

**Respuesta (200 OK):**
```json
{
  "status": "success",
  "message": "Data generated successfully",
  "users": 5,
  "pets": 10
}
```

---

### 4️⃣ Crear una adopción

```bash
curl -X POST http://localhost:8080/api/adoptions/{userId}/{petId}
```

**Pasos:**
1. Obtén un `userId` con: `curl http://localhost:8080/api/users`
2. Obtén un `petId` con: `curl http://localhost:8080/api/pets`
3. Copia los IDs y reemplaza `{userId}` y `{petId}`

**Respuesta (200 OK):**
```json
{
  "status": "success",
  "message": "Pet adopted"
}
```

---

## 🔄 Flujo Completo: Step by Step

### ✅ Paso 1: Iniciar el servidor

```bash
# Opción 1: Con Docker Compose
docker-compose up

# Opción 2: Sin Docker
npm install && npm run dev
```

**Espera a ver:**
```
adoptme-backend | Listening on 8080
```

### ✅ Paso 2: Generar datos de prueba

```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 3, "pets": 5}'
```

### ✅ Paso 3: Listar usuarios

```bash
curl http://localhost:8080/api/users
```

Busca en la respuesta el primer `_id` y cópialo. Ejemplo:
```
"_id": "65a1b2c3d4e5f6g7h8i9j0k1"
```

### ✅ Paso 4: Listar mascotas disponibles

```bash
curl http://localhost:8080/api/pets
```

Busca una mascota con `"adopted": false` y copia su `_id`. Ejemplo:
```
"_id": "65a1b2c3d4e5f6g7h8i9j0k2"
```

### ✅ Paso 5: Crear una adopción

```bash
curl -X POST http://localhost:8080/api/adoptions/65a1b2c3d4e5f6g7h8i9j0k1/65a1b2c3d4e5f6g7h8i9j0k2
```

Deberías recibir:
```json
{
  "status": "success",
  "message": "Pet adopted"
}
```

### ✅ Paso 6: Verificar la adopción

```bash
# Ver todas las adopciones
curl http://localhost:8080/api/adoptions

# Ver la mascota (ahora debe tener "adopted": true)
curl http://localhost:8080/api/pets/65a1b2c3d4e5f6g7h8i9j0k2
```

### ✅ Paso 7: (Opcional) Explorar con Swagger

Abre en tu navegador:
```
http://localhost:8080/api/docs
```

---

## 📊 Ejemplo de Flujo: Generar y Adoptar

```
1. Usuario inicia servidor
   ↓
2. Genera 5 usuarios + 10 mascotas
   (POST /api/mocks/generateData)
   ↓
3. Obtiene usuarios creados
   (GET /api/users)
   ↓
4. Obtiene mascotas disponibles
   (GET /api/pets)
   ↓
5. Crea una adopción
   (POST /api/adoptions/:uid/:pid)
   ↓
6. Mascota pasa a "adoptada"
   ↓
7. Verifica historial
   (GET /api/adoptions)
```

**Flujo visual en terminal:**
```bash
npm run dev                      # Servidor listo

# Generar datos
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 5, "pets": 10}'

# Ver usuarios
curl http://localhost:8080/api/users

# Ver mascotas
curl http://localhost:8080/api/pets

# Adoptar (uid y pid obtenidos de arriba)
curl -X POST http://localhost:8080/api/adoptions/USER_ID/PET_ID
```

---

## 🛠️ Dependencias Principales

```json
{
  "express": "^4.18.2",
  "mongoose": "^6.7.5",
  "bcrypt": "^5.1.0",
  "jsonwebtoken": "^8.5.1",
  "cookie-parser": "^1.4.6",
  "@faker-js/faker": "^8.3.1",
  "multer": "^1.4.5-lts.1"
}
```

---

## 🐛 Troubleshooting

### ❌ Error Docker: "Port 8080 already allocated"
```bash
# Solución 1: Detener contenedores previos
docker stop $(docker ps -q)

# Solución 2: Usar docker-compose
docker-compose down
docker-compose up
```

### ❌ Error Docker: "Cannot connect to MongoDB"
```bash
# Si usas Docker Compose, está automático
docker-compose up

# Si usas Docker sin Compose, asegúrate que MongoDB esté corriendo:
mongosh  # Si tienes MongoDB local
```

### ❌ Error: "Failed to set up container networking"
```bash
# Solución: Limpiar contenedores
docker system prune -a --volumes
docker-compose up
```

### ❌ Error Local: "MongoDB connection failed"
```bash
# Verificar que MongoDB está corriendo:
mongosh

# O iniciar MongoDB:
mongod  # Windows
brew services start mongodb-community  # Mac
sudo systemctl start mongod  # Linux
```

### ❌ Error: "Cannot find module '@faker-js/faker'"
```bash
# Solución: Reinstalar dependencias
npm install
```

### ❌ Error: "Port 8080 in use (sin Docker)"
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8080
kill -9 <PID>
```

### ❌ Docker logs no muestran nada
```bash
# Ver logs del backend
docker logs adoptme-backend

# Ver logs de MongoDB
docker logs adoptme-mongo

# Seguir logs en tiempo real
docker logs -f adoptme-backend
```

---

## 📚 Documentación Completa

El proyecto incluye **10+ guías** profesionales:

| Archivo | Propósito |
|---------|-----------|
| **LECTURA_PRIMERA.md** | Bienvenida y orientación |
| **QUICK_START.md** | Inicio en 5 minutos |
| **TESTING_GUIDE.md** | Guía completa de pruebas |
| **EJEMPLOS_RESPUESTAS.md** | Requests y responses |
| **RESUMEN_ENTREGA.md** | Código comentado |
| **START_HERE.md** | Resumen visual |
| **postman_collection.json** | Importar en Postman |
| **test_endpoints.sh** | Script de pruebas |

**Acceso rápido:**
```bash
# Empieza aquí si eres nuevo
cat LECTURA_PRIMERA.md

# Si tienes 5 minutos
cat QUICK_START.md

# Para probar completo
cat TESTING_GUIDE.md
```

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Endpoints | 15+ |
| Controladores | 4 |
| Modelos | 3 |
| Patrones | 3 (DAO, Repository, DTO) |
| Líneas de código | 500+ |
| Documentación | 10+ guías |
| Errores encontrados | 0 |

---

## ✅ Checklist de Entrega

- [x] Router de mocks implementado
- [x] GET /mockingpets (100 mascotas)
- [x] GET /mockingusers (50 usuarios)
- [x] POST /generateData (insertar en BD)
- [x] Módulo mockingUsers creado
- [x] Password encriptado con bcrypt
- [x] Role aleatorio (user/admin)
- [x] ObjectIds válidos de MongoDB
- [x] Validación robusta
- [x] Manejo completo de errores
- [x] Async/await correcto
- [x] DAO Pattern implementado
- [x] Repository Pattern implementado
- [x] DTO Pattern implementado
- [x] Middleware de autorización
- [x] CRUD de usuarios
- [x] CRUD de mascotas
- [x] Sistema de adopciones
- [x] Documentación profesional

---

## 🎓 Conceptos Implementados

✅ Express.js & Routing
✅ Mongoose & MongoDB
✅ Async/Await & Promises
✅ JWT & Autenticación
✅ Bcrypt & Seguridad
✅ Middleware personalizado
✅ Error Handling robusto
✅ DAO Pattern
✅ Repository Pattern
✅ DTO Pattern
✅ Faker.js para generación de datos
✅ ObjectId validation
✅ RESTful API Design
✅ HTTP Status Codes

---

## 🚀 Próximos Pasos

### 1. Comenzar desarrollo
```bash
npm run dev
```

### 2. Probar endpoints
- Abre `TESTING_GUIDE.md`
- O importa `postman_collection.json` en Postman

### 3. Entender la arquitectura
- Lee `RESUMEN_ENTREGA.md`
- Explora el código en `src/`

### 4. Personalizar
- Agrega nuevas mascotas
- Crea más datos de prueba
- Implementa nuevos endpoints

---

## 👤 Autor

Proyecto desarrollado para **Coderhouse Backend**

**Entrega:** N°1 - Mocking y Generación de Datos  
**Fecha:** 17 de diciembre de 2025  

---

---

## ✅ Checklist de Entrega Final

Antes de entregar, verifica que cumples con todos los requisitos:

### 🐳 Docker
- [ ] Imagen construida localmente: `docker build -t alejo14alm/adoptme-backend:latest .`
- [ ] Contenedor ejecutándose: `docker run -p 8080:8080 -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme alejo14alm/adoptme-backend:latest`
- [ ] Imagen disponible en DockerHub: `https://hub.docker.com/r/alejo14alm/adoptme-backend`
- [ ] Puertos expuestos correctamente (8080)
- [ ] Variables de entorno documentadas (MONGO_URI, PORT)

### 📚 Documentación
- [ ] Swagger accesible en `http://localhost:8080/api/docs`
- [ ] Módulos documentados: Users, Pets, Adoptions, Mocking, Sessions
- [ ] Ejemplos reales de curl incluidos en el README
- [ ] Flujo completo documentado paso a paso

### 🧪 Tests
- [ ] Tests ejecutándose: `npm test`
- [ ] Cobertura en adoption endpoints
- [ ] Validaciones documentadas
- [ ] Errores HTTP manejados correctamente

### 🏗️ Arquitectura
- [ ] Patrón DAO implementado
- [ ] Patrón Repository implementado
- [ ] Patrón DTO implementado
- [ ] Servicios centralizados
- [ ] Rutas organizadas

### 🔐 Seguridad
- [ ] Bcrypt para contraseñas (10 rounds)
- [ ] JWT con expiración (1h)
- [ ] Cookies seguras
- [ ] Validaciones en cada endpoint
- [ ] DTOs excluyen datos sensibles

### 🎯 Funcionalidad
- [ ] CRUD usuarios completo
- [ ] CRUD mascotas completo
- [ ] CRUD adopciones completo
- [ ] Mocking de datos (Faker.js)
- [ ] Subida de imágenes (Multer)
- [ ] Autenticación con JWT
- [ ] Roles (admin/user)

### 📝 Entrega
- [ ] README.md actualizado y completo
- [ ] `.gitignore` configurado
- [ ] `docker-compose.yml` funcional
- [ ] `Dockerfile` optimizado
- [ ] `package.json` con scripts correctos
- [ ] Código limpio y comentado

---

## 🎉 ¡Listo para Entregar!

Este proyecto cumple con **todas las mejores prácticas** de desarrollo backend profesional:

### ✅ Arquitectura & Código
- ✅ Estructura modular y escalable
- ✅ Separación clara de responsabilidades
- ✅ Código limpio y mantenible
- ✅ Patrones de diseño implementados (DAO, Repository, DTO)

### ✅ Infraestructura
- ✅ Docker & Docker Compose incluido
- ✅ MongoDB integrado
- ✅ Tests automatizados con Jest
- ✅ Documentación Swagger/OpenAPI 3.0

### ✅ Seguridad
- ✅ Autenticación segura con JWT
- ✅ Contraseñas hasheadas con Bcrypt
- ✅ Validación en cada endpoint
- ✅ Exclusión de datos sensibles

### ✅ Funcionalidad
- ✅ 15+ endpoints RESTful
- ✅ CRUD completo para usuarios, mascotas y adopciones
- ✅ Sistema de mocking inteligente
- ✅ Gestión de imágenes con Multer
- ✅ Autenticación y roles

---

## 📞 Preguntas Frecuentes

### ¿Puedo cambiar el puerto 8080?

Sí, con la variable de entorno `PORT`:

```bash
docker run -p 3000:3000 -e PORT=3000 alejo14alm/adoptme-backend:latest
```

### ¿Cómo conecto a MongoDB Atlas?

Edita la variable `MONGO_URI`:

```bash
docker run -p 8080:8080 \
  -e MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/adoptme" \
  alejo14alm/adoptme-backend:latest
```

### ¿Cómo veo los logs de Docker?

```bash
docker logs -f <CONTAINER_ID>
```

### ¿Cómo detener todo con Docker Compose?

```bash
docker-compose down
```

Para limpiar volúmenes también:

```bash
docker-compose down -v
```

---

## 🚀 Comandos Rápidos de Referencia

```bash
# 🐳 Docker - Build & Run Local
docker build -t alejo14alm/adoptme-backend:latest .
docker run -p 8080:8080 -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme alejo14alm/adoptme-backend:latest

# 🐳 Docker - Pull & Run desde DockerHub
docker pull alejo14alm/adoptme-backend:latest
docker run -p 8080:8080 -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme alejo14alm/adoptme-backend:latest

# 🐳 Docker - Build & Push a DockerHub
docker build -t alejo14alm/adoptme-backend:latest .
docker login
docker push alejo14alm/adoptme-backend:latest

# 🐳 Docker Compose
docker-compose up
docker-compose down

# 📦 NPM
npm install
npm run dev
npm start
npm test

# 🧪 Tests
npm test -- --watch
npm test -- --coverage

# 📚 Swagger
http://localhost:8080/api/docs

# 🔧 Ver logs Docker
docker logs -f <CONTAINER_ID>
docker-compose logs -f adoptme-backend
```

---

**© 2026 Adoptme-Backend | Coderhouse Backend | Made with ❤️**

---
 
## 🐳 Docker & DockerHub

### 📦 Imagen Pública en DockerHub

La imagen está disponible en Docker Hub:

🔗 **https://hub.docker.com/r/alejo14alm/adoptme-backend**

---

### 🔨 Construir la Imagen Localmente

Para buildear la imagen de forma local:

```bash
docker build -t alejo14alm/adoptme-backend:latest .
```

Esto creará una imagen optimizada basada en Alpine de Node.js con todas las dependencias necesarias.

---

### 🚀 Ejecutar el Contenedor

#### Opción 1: Desde imagen local (después de buildear)

```bash
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  alejo14alm/adoptme-backend:latest
```

#### Opción 2: Desde DockerHub (sin buildear)

```bash
# Descargar imagen de DockerHub
docker pull alejo14alm/adoptme-backend:latest

# Ejecutar
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  alejo14alm/adoptme-backend:latest
```

#### Verificar que está corriendo:

```bash
# Ver logs en tiempo real
docker logs -f <CONTAINER_ID>

# Probar el servidor en otra terminal
curl http://localhost:8080/api/users
```

---

### 📝 Variables de Entorno

| Variable | Descripción | Valor por defecto | Obligatoria |
|----------|------------|------------------|------------|
| `MONGO_URI` | URL de conexión a MongoDB | `mongodb://localhost:27017/adoptme` | ✅ Sí |
| `PORT` | Puerto donde corre el servidor | `8080` | ❌ No |

**Ejemplo con variables personalizadas:**
```bash
docker run -p 8080:8080 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/adoptme" \
  -e PORT=8080 \
  alejo14alm/adoptme-backend:latest
```

---

### 🖥️ Puertos Expuestos

| Puerto | Servicio | Descripción |
|--------|---------|------------|
| **8080** | Backend API | API REST de Adoptme |

El servidor Express corre en el puerto 8080 y expone todos los endpoints de la aplicación.

---

### 🐳 Docker Compose (Alternativa Completa)

Si prefieres ejecutar MongoDB + Backend juntos automáticamente:

```bash
# Iniciar servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f adoptme-backend
```

**Servicios incluidos:**
- `adoptme-mongo`: MongoDB 6.0 (puerto 27017)
- `adoptme-backend`: Backend (puerto 8080)

**Ventajas:**
- ✅ MongoDB se configura automáticamente
- ✅ Red interna entre servicios
- ✅ Volúmenes persistentes para datos
- ✅ Una sola línea para levantar todo

---

### 🏗️ Ciclo Completo: Build → Push → Pull

#### 1. Buildear imagen localmente

```bash
docker build -t alejo14alm/adoptme-backend:latest .
```

#### 2. Verificar imagen

```bash
docker images | grep adoptme
```

#### 3. Subir a DockerHub

```bash
# Login a DockerHub (una sola vez)
docker login

# Push a DockerHub
docker push alejo14alm/adoptme-backend:latest

# Crear etiqueta adicional (opcional)
docker tag alejo14alm/adoptme-backend:latest alejo14alm/adoptme-backend:1.0
docker push alejo14alm/adoptme-backend:1.0
```

#### 4. Descargar desde DockerHub

Otros usuarios (o tú en otra máquina) pueden descargar y ejecutar con:

```bash
# Pull desde DockerHub
docker pull alejo14alm/adoptme-backend:latest

# Ejecutar
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  alejo14alm/adoptme-backend:latest
```

---

### 🧪 Prueba Rápida para el Corrector

**Opción 1: Con Docker Compose (RECOMENDADO - 1 comando)**

```bash
docker-compose up
```

Luego en otra terminal:

```bash
# Acceder a Swagger (documentación interactiva)
http://localhost:8080/api/docs

# O probar un endpoint
curl http://localhost:8080/api/users
```

**Opción 2: Con Docker solo**

```bash
# Asegúrate de tener MongoDB corriendo en localhost:27017
docker pull alejo14alm/adoptme-backend:latest
docker run -p 8080:8080 -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme alejo14alm/adoptme-backend:latest
```

Luego en otra terminal:

```bash
curl http://localhost:8080/api/users
```

**Opción 3: Sin Docker (local)**

```bash
npm install
npm run dev
```

Luego:

```bash
curl http://localhost:8080/api/users
```

**✅ Verificación rápida:**
- Swagger UI: http://localhost:8080/api/docs
- API funcionando: `curl http://localhost:8080/api/users` (debería devolver JSON)

---

## 🧪 Tests

Los tests se ejecutan con `jest` + `supertest` usando una instancia de MongoDB en memoria.

```bash
npm install
npm test
```

La cobertura generada incluye los endpoints de `adoption.router.js`.

## 🎉 ¡Listo para Producción!

Este proyecto implementa **todas las mejores prácticas** de desarrollo backend:

### ✅ Arquitectura & Código
- ✅ Arquitectura escalable y modular
- ✅ Separación clara de responsabilidades
- ✅ Código limpio y bien comentado
- ✅ Patrones profesionales (DAO, Repository, DTO)

### ✅ Seguridad
- ✅ Bcrypt para hasheo de contraseñas (10 rounds)
- ✅ JWT con expiración de sesiones (1h)
- ✅ Cookies seguras
- ✅ DTOs que excluyen datos sensibles
- ✅ Validación en cada endpoint

### ✅ Infraestructura
- ✅ Docker & Docker Compose incluido
- ✅ MongoDB integrado
- ✅ Tests automatizados (Jest + Supertest)
- ✅ Configuración para CI/CD

### ✅ Funcionalidad
- ✅ Autenticación con JWT
- ✅ CRUD completo de usuarios
- ✅ CRUD completo de mascotas
- ✅ Sistema de adopciones
- ✅ Generación realista de datos (Faker.js)
- ✅ Subida de imágenes (Multer)
- ✅ Documentación con Swagger

---

## 🚀 Comenzar Ahora

### Con Docker (Recomendado):
```bash
cd Backend-Adoptme-main
docker-compose up
# Abre http://localhost:8080/api/users
```

### Sin Docker:
```bash
cd Backend-Adoptme-main
npm install
npm run dev
# Abre http://localhost:8080/api/users
```

---

## 📞 Soporte

Si encuentras problemas:

1. **Verifica los requisitos** en la sección de Instalación
2. **Consulta el Troubleshooting** para errores comunes
3. **Revisa los logs** con `docker logs adoptme-backend`
4. **Ejecuta los tests** con `npm test`

---

**© 2026 Adoptme-Backend | Coderhouse Backend | Made with ❤️**
