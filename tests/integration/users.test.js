/**
 * Tests para endpoints de usuarios
 * Cubre casos de éxito y error para operaciones CRUD
 */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { connectDB, disconnectDB, clearDB } from '../setup.js';
import User from '../../src/dao/models/User.js';

describe('Users Controller', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(async () => {
        await clearDB();
    });

    describe('GET /api/users', () => {
        it('Debe obtener todos los usuarios (caso exitoso)', async () => {
            // Preparar datos de prueba
            const testUser = await User.create({
                first_name: 'Juan',
                last_name: 'Pérez',
                email: 'juan@test.com',
                password: 'hashedpassword123',
                role: 'user'
            });

            // Hacer la solicitud
            const response = await request(app)
                .get('/api/users')
                .expect(200);

            // Validar respuesta
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('payload');
            expect(Array.isArray(response.body.payload)).toBe(true);
            expect(response.body.payload.length).toBe(1);
            expect(response.body.payload[0].email).toBe('juan@test.com');
        });

        it('Debe retornar un array vacío cuando no hay usuarios', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload).toEqual([]);
        });
    });

    describe('GET /api/users/:uid', () => {
        it('Debe obtener un usuario por ID (caso exitoso)', async () => {
            // Preparar datos de prueba
            const testUser = await User.create({
                first_name: 'María',
                last_name: 'González',
                email: 'maria@test.com',
                password: 'hashedpassword456',
                role: 'user'
            });

            // Hacer la solicitud
            const response = await request(app)
                .get(`/api/users/${testUser._id}`)
                .expect(200);

            // Validar respuesta
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload.email).toBe('maria@test.com');
            expect(response.body.payload.first_name).toBe('María');
        });

        it('Debe retornar 404 si el usuario no existe', async () => {
            // Usar un ID válido pero que no existe
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .get(`/api/users/${fakeId}`)
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe('PUT /api/users/:uid', () => {
        it('Debe actualizar un usuario existente', async () => {
            // Preparar datos de prueba
            const testUser = await User.create({
                first_name: 'Carlos',
                last_name: 'López',
                email: 'carlos@test.com',
                password: 'hashedpassword789',
                role: 'user'
            });

            // Actualizar usuario
            const response = await request(app)
                .put(`/api/users/${testUser._id}`)
                .send({ first_name: 'Carlos Actualizado' })
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.message).toBe('User updated');

            // Verificar que se actualizó en BD
            const updatedUser = await User.findById(testUser._id);
            expect(updatedUser.first_name).toBe('Carlos Actualizado');
        });

        it('Debe retornar 404 al actualizar usuario inexistente', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .put(`/api/users/${fakeId}`)
                .send({ first_name: 'Nuevo nombre' })
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('User not found');
        });
    });

    describe('DELETE /api/users/:uid', () => {
        it('Debe eliminar un usuario (devuelve 200 incluso sin validar)', async () => {
            // Nota: El controller tiene un bug - no valida si el usuario existe antes de "eliminar"
            // Pero este es un test de comportamiento actual
            const testUser = await User.create({
                first_name: 'David',
                last_name: 'Martínez',
                email: 'david@test.com',
                password: 'hashedpassword101',
                role: 'user'
            });

            const response = await request(app)
                .delete(`/api/users/${testUser._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.message).toBe('User deleted');
        });

        it('Debe retornar error con ID inválido', async () => {
            const response = await request(app)
                .delete('/api/users/invalid-id')
                .expect(500); // Error del controlador, no valida el ID

            // Aunque el código no lo valida, Mongoose lo rechaza
        });
    });
});
