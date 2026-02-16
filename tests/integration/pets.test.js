/**
 * Tests para endpoints de mascotas
 * Cubre operaciones CRUD de mascotas
 */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { connectDB, disconnectDB, clearDB } from '../setup.js';
import Pet from '../../src/dao/models/Pet.js';

describe('Pets Controller', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(async () => {
        await clearDB();
    });

    describe('GET /api/pets', () => {
        it('Debe obtener todas las mascotas (caso exitoso)', async () => {
            // Preparar datos de prueba
            const testPet = await Pet.create({
                name: 'Firulais',
                specie: 'dog',
                birthDate: new Date('2020-01-15'),
                adopted: false
            });

            const response = await request(app)
                .get('/api/pets')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('payload');
            expect(Array.isArray(response.body.payload)).toBe(true);
            expect(response.body.payload.length).toBe(1);
            expect(response.body.payload[0].name).toBe('Firulais');
        });

        it('Debe retornar un array vacío cuando no hay mascotas', async () => {
            const response = await request(app)
                .get('/api/pets')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload).toEqual([]);
        });
    });

    describe('POST /api/pets', () => {
        it('Debe crear una nueva mascota exitosamente', async () => {
            const newPet = {
                name: 'Milu',
                specie: 'cat',
                birthDate: '2021-06-10'
            };

            const response = await request(app)
                .post('/api/pets')
                .send(newPet)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload).toHaveProperty('_id');
            expect(response.body.payload.name).toBe('Milu');
            expect(response.body.payload.specie).toBe('cat');
            expect(response.body.payload.adopted).toBe(false);

            // Verificar que se guardó en BD
            const savedPet = await Pet.findById(response.body.payload._id);
            expect(savedPet).not.toBeNull();
            expect(savedPet.name).toBe('Milu');
        });

        it('Debe rechazar creación con campos incompletos (400)', async () => {
            const incompletePet = {
                name: 'Incompleto',
                // Faltan specie y birthDate
            };

            const response = await request(app)
                .post('/api/pets')
                .send(incompletePet)
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Incomplete values');
        });

        it('Debe rechazar creación sin nombre', async () => {
            const invalidPet = {
                specie: 'dog',
                birthDate: '2020-01-01'
            };

            const response = await request(app)
                .post('/api/pets')
                .send(invalidPet)
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
        });

        it('Debe rechazar creación sin especie', async () => {
            const invalidPet = {
                name: 'Rex',
                birthDate: '2020-01-01'
            };

            const response = await request(app)
                .post('/api/pets')
                .send(invalidPet)
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
        });
    });

    describe('PUT /api/pets/:pid', () => {
        it('Debe actualizar una mascota existente', async () => {
            const testPet = await Pet.create({
                name: 'Max',
                specie: 'dog',
                birthDate: new Date('2019-03-20'),
                adopted: false
            });

            const response = await request(app)
                .put(`/api/pets/${testPet._id}`)
                .send({ adopted: true })
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.message).toBe('pet updated');

            // Verificar que se actualizó en BD
            const updatedPet = await Pet.findById(testPet._id);
            expect(updatedPet.adopted).toBe(true);
        });

        it('Debe permitir actualizar nombre de mascota', async () => {
            const testPet = await Pet.create({
                name: 'Luna',
                specie: 'cat',
                birthDate: new Date('2021-07-10'),
                adopted: false
            });

            const response = await request(app)
                .put(`/api/pets/${testPet._id}`)
                .send({ name: 'Lunita' })
                .expect(200);

            const updatedPet = await Pet.findById(testPet._id);
            expect(updatedPet.name).toBe('Lunita');
        });
    });

    describe('DELETE /api/pets/:pid', () => {
        it('Debe eliminar una mascota', async () => {
            const testPet = await Pet.create({
                name: 'Bentley',
                specie: 'dog',
                birthDate: new Date('2018-05-05'),
                adopted: false
            });

            const response = await request(app)
                .delete(`/api/pets/${testPet._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.message).toBe('pet deleted');

            // Verificar que se eliminó de BD
            const deletedPet = await Pet.findById(testPet._id);
            expect(deletedPet).toBeNull();
        });

        it('Debe manejar eliminación de ID inexistente', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .delete(`/api/pets/${fakeId}`)
                .expect(200); // El controller devuelve 200 sin validar

            expect(response.body).toHaveProperty('status', 'success');
        });
    });
});
