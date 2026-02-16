/**
 * Tests para endpoints de sesiones (autenticación)
 * Cubre registro, login y manejo de errores
 */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { connectDB, disconnectDB, clearDB } from '../setup.js';
import User from '../../src/dao/models/User.js';
import { createHash } from '../../src/utils/index.js';

describe('Sessions Controller', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(async () => {
        await clearDB();
    });

    describe('POST /api/sessions/register', () => {
        it('Debe registrar un nuevo usuario exitosamente', async () => {
            const newUser = {
                first_name: 'Juan',
                last_name: 'Pérez',
                email: 'juan@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/sessions/register')
                .send(newUser)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('payload');
            expect(mongoose.Types.ObjectId.isValid(response.body.payload)).toBe(true);

            // Verificar que el usuario se guardó en BD
            const savedUser = await User.findOne({ email: newUser.email });
            expect(savedUser).not.toBeNull();
            expect(savedUser.first_name).toBe('Juan');
        });

        it('Debe rechazar registro con campos incompletos', async () => {
            const incompleteUser = {
                first_name: 'Juan',
                last_name: 'Pérez'
                // Faltan email y password
            };

            const response = await request(app)
                .post('/api/sessions/register')
                .send(incompleteUser)
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Incomplete values');
        });

        it('Debe rechazar registro si el email ya existe', async () => {
            const email = 'existing@example.com';
            
            // Crear primer usuario
            await User.create({
                first_name: 'Existente',
                last_name: 'Usuario',
                email,
                password: 'hashedpassword',
                role: 'user'
            });

            // Intentar registrar con el mismo email
            const response = await request(app)
                .post('/api/sessions/register')
                .send({
                    first_name: 'Otro',
                    last_name: 'Usuario',
                    email,
                    password: 'password123'
                })
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('User already exists');
        });
    });

    describe('POST /api/sessions/login', () => {
        beforeEach(async () => {
            // Crear usuario de prueba
            const hashedPassword = await createHash('password123');
            await User.create({
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com',
                password: hashedPassword,
                role: 'user'
            });
        });

        it('Debe permitir login con credenciales correctas', async () => {
            const response = await request(app)
                .post('/api/sessions/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                })
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.message).toBe('Logged in');
            expect(response.headers['set-cookie']).toBeDefined();
        });

        it('Debe rechazar login con campos incompletos', async () => {
            const response = await request(app)
                .post('/api/sessions/login')
                .send({
                    email: 'test@example.com'
                    // Falta password
                })
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Incomplete values');
        });

        it('Debe rechazar login si el usuario no existe', async () => {
            const response = await request(app)
                .post('/api/sessions/login')
                .send({
                    email: 'noexiste@example.com',
                    password: 'password123'
                })
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe("User doesn't exist");
        });

        it('Debe rechazar login con contraseña incorrecta', async () => {
            const response = await request(app)
                .post('/api/sessions/login')
                .send({
                    email: 'test@example.com',
                    password: 'passwordincorrecto'
                })
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Incorrect password');
        });
    });

    describe('GET /api/sessions/current', () => {
        it('Debe retornar usuario actual con cookie válida', async () => {
            // Crear usuario y hacer login
            const userData = {
                first_name: 'Current',
                last_name: 'User',
                email: 'current@example.com',
                password: 'password123'
            };

            // Registrar usuario
            await request(app)
                .post('/api/sessions/register')
                .send(userData);

            // Login y obtener cookie
            const loginResponse = await request(app)
                .post('/api/sessions/login')
                .send({
                    email: userData.email,
                    password: userData.password
                });

            // Usar la cookie para obtener usuario actual
            const response = await request(app)
                .get('/api/sessions/current')
                .set('Cookie', loginResponse.headers['set-cookie'][0])
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload).toHaveProperty('name');
            expect(response.body.payload.email).toBe(userData.email);
        });
    });
});
