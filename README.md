# Adoptme-Backend

Backend profesional para plataforma de adopción de mascotas.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.7-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![Jest](https://img.shields.io/badge/Jest-Testing-green)

## Descripción

API REST para gestionar usuarios, mascotas en adopción e historial de adopciones. Arquitectura modular con patrones DAO, Repository y DTO. Incluye autenticación JWT, encriptación con Bcrypt, generación de datos con Faker y tests automatizados.

---

## ⚠️ Importante: Docker vs Sin Docker

| Escenario | Estado | Notas |
|-----------|--------|-------|
| **Con Docker Compose** | ✅ FUNCIONA | MongoDB configurado automáticamente |
| **Con Docker + MongoDB local** | ⚠️ REQUIERE SETUP | Necesita MongoDB corriendo en localhost:27017 |
| **Sin Docker (Local)** | ⚠️ PUEDE FALLAR | MONGO_URI es **obligatoria** |

---

## Inicio Rápido

### Con Docker Compose (RECOMENDADO)

```bash
docker-compose up
```

Luego abre:
- Backend: `http://localhost:8080`
- Swagger: `http://localhost:8080/api/docs`

Detener con `Ctrl+C` y limpiar todo:

```bash
docker-compose down -v
```

---

## Instalación

### Opción 1: Docker Compose

**Requisitos:** Docker instalado

```bash
docker-compose up --build
```

**Servicios:**
- Backend: `http://localhost:8080`
- MongoDB: `mongodb://localhost:27017`
- Swagger: `http://localhost:8080/api/docs`

---

### Opción 2: Docker (sin Compose)

**Requisitos:** Docker + MongoDB local en `localhost:27017`

```bash
docker build -t alejo14alm/adoptme-backend:latest .

docker run -p 8080:8080 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/adoptme" \
  alejo14alm/adoptme-backend:latest
```

---

### Opción 3: Local (Sin Docker)

**Requisitos:** Node.js 14+, MongoDB local corriendo

```bash
npm install
npm run dev
```

**IMPORTANTE:** Si usas una URL diferente de MongoDB:

```bash
export MONGO_URI="mongodb://tu-url:27017/adoptme"
npm run dev
```

---

## Características

- **Autenticación:** JWT con expiración 1h, Bcrypt 10 rounds
- **CRUD:** Usuarios, mascotas, adopciones
- **Mocking:** Generador de datos realistas con Faker.js
- **Imágenes:** Soporte con Multer
- **Tests:** Jest + Supertest (35+ tests, 72%+ coverage)
- **API Docs:** Swagger/OpenAPI 3.0

---

## Estructura del Proyecto

```
src/
├── controllers/        # Lógica de endpoints
├── dao/               # Data Access Objects + Modelos Mongoose
├── dto/               # Data Transfer Objects
├── repository/        # Patrón Repository
├── routes/            # Rutas API
├── services/          # Servicios centralizados
├── utils/             # Utilidades (Bcrypt, Multer, Faker)
├── public/img/        # Imágenes subidas
├── app.js             # Config Express
├── server.js          # Entry point
└── swagger.json       # OpenAPI 3.0

tests/
├── setup.js           # Setup MongoDB en memoria
└── integration/       # Tests de endpoints

docker-compose.yml     # Orquestación servicios
Dockerfile             # Imagen Docker
```

---

## Endpoints Disponibles

### Usuarios

```
GET    /api/users              # Listar todos
GET    /api/users/:uid         # Obtener por ID
PUT    /api/users/:uid         # Actualizar
DELETE /api/users/:uid         # Eliminar
```

### Mascotas

```
GET    /api/pets               # Listar todas
POST   /api/pets               # Crear
POST   /api/pets/withimage     # Crear con imagen
PUT    /api/pets/:pid          # Actualizar
DELETE /api/pets/:pid          # Eliminar
```

### Adopciones

```
GET    /api/adoptions          # Listar todas
GET    /api/adoptions/:aid     # Obtener por ID
POST   /api/adoptions/:uid/:pid # Crear adopción
```

### Autenticación

```
POST   /api/sessions/register  # Registrar
POST   /api/sessions/login     # Login
GET    /api/sessions/current   # Usuario actual
```

### Mocking

```
GET    /api/mocks/mockingpets   # 100 mascotas simuladas
GET    /api/mocks/mockingusers  # 50 usuarios simulados
POST   /api/mocks/generateData  # Generar e insertar en BD
```

Documentación completa: `http://localhost:8080/api/docs`

---

## Ejemplos de Uso

### Obtener usuarios

```bash
curl http://localhost:8080/api/users
```

### Generar datos de prueba

```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 5, "pets": 10}'
```

### Crear mascota

```bash
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Firulais",
    "specie": "dog",
    "birthDate": "2020-01-15"
  }'
```

### Registrar usuario

```bash
curl -X POST http://localhost:8080/api/sessions/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@test.com",
    "password": "password123"
  }'
```

---

## Testing

```bash
# Ejecutar tests
npm test

# Modo observador
npm test -- --watch

# Con cobertura
npm test -- --coverage
```

Stack: Jest + Supertest + mongodb-memory-server

Resultado: 35+ tests pasando, 72%+ coverage

---

## Variables de Entorno

| Variable | Descripción | Obligatoria | Default |
|----------|------------|------------|---------|
| `MONGO_URI` | URL MongoDB | ✅ Sí | - |
| `PORT` | Puerto servidor | ❌ No | 8080 |

Ejemplo:

```bash
export MONGO_URI="mongodb://localhost:27017/adoptme"
```

---

## Docker & DockerHub

### Construir imagen

```bash
docker build -t alejo14alm/adoptme-backend:latest .
```

### Ejecutar desde DockerHub

```bash
docker pull alejo14alm/adoptme-backend:latest

docker run -p 8080:8080 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/adoptme" \
  alejo14alm/adoptme-backend:latest
```

### Subir a DockerHub

```bash
docker login
docker push alejo14alm/adoptme-backend:latest
```

DockerHub: `https://hub.docker.com/r/alejo14alm/adoptme-backend`

---

## Troubleshooting

### Puerto 8080 ocupado

**Windows:**
```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :8080
kill -9 <PID>
```

### MongoDB no conecta

Verificar que corre en `localhost:27017`:

```bash
mongosh
```

O usar Docker Compose (automático).

### Error Docker: "Port already allocated"

```bash
docker-compose down
docker-compose up
```

### Tests fallando

```bash
rm -rf node_modules
npm install
npm test
```

### Ver logs Docker

```bash
docker logs -f adoptme-backend
docker-compose logs -f adoptme-backend
```

---

## Volver al Último Commit

Para limpiar cambios y volver al estado original:

```bash
git reset --hard HEAD
git clean -fd
```

---

## Seguridad

- ✅ Bcrypt (10 rounds) para contraseñas
- ✅ JWT con expiración (1h)
- ✅ Validación en cada endpoint
- ✅ DTOs excluyen datos sensibles
- ✅ Manejo estructurado de errores

---

## Notas Importantes

1. **MONGO_URI es obligatoria:** Sin Docker Compose, debes configurarla
2. **Docker Compose es recomendado:** Evita problemas de configuración
3. **Tests necesitan BD en memoria:** Se ejecutan con `npm test`
4. **Swagger explore endpoints:** `http://localhost:8080/api/docs`

---

## Dependencias Principales

```json
{
  "express": "^4.18.2",
  "mongoose": "^6.7.5",
  "bcrypt": "^5.1.0",
  "jsonwebtoken": "^8.5.1",
  "cookie-parser": "^1.4.6",
  "@faker-js/faker": "^8.3.1",
  "multer": "^1.4.5-lts.1",
  "swagger-ui-express": "^4.6.3"
}
```

---

## Licencia

ISC

---

**© 2026 Adoptme-Backend | Coderhouse Backend**
