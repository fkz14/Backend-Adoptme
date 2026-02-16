/**
 * Tests para endpoints de adopciones
 * Cubre crear, obtener y validar adopciones
 */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { connectDB, disconnectDB, clearDB } from '../setup.js';
import User from '../../src/dao/models/User.js';
import Pet from '../../src/dao/models/Pet.js';
import Adoption from '../../src/dao/models/Adoption.js';

describe('Adoptions Controller', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    afterEach(async () => {
        await clearDB();
    });

    describe('GET /api/adoptions', () => {
        it('Debe obtener todas las adopciones (caso exitoso)', async () => {
            // Preparar datos de prueba
            const user = await User.create({
                first_name: 'Juan',
                last_name: 'Adoptador',
                email: 'juan@adopt.com',
                password: 'hashedpass123',
                role: 'user'
            });

            const pet = await Pet.create({
                name: 'Rocky',
                specie: 'dog',
                birthDate: new Date('2020-01-15'),
                adopted: true,
                owner: user._id
            });

            const adoption = await Adoption.create({
                owner: user._id,
                pet: pet._id
            });

            const response = await request(app)
                .get('/api/adoptions')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body).toHaveProperty('payload');
            expect(Array.isArray(response.body.payload)).toBe(true);
            expect(response.body.payload.length).toBe(1);
        });

        it('Debe retornar array vacío sin adopciones', async () => {
            const response = await request(app)
                .get('/api/adoptions')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload).toEqual([]);
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('Debe obtener una adopción por ID', async () => {
            const user = await User.create({
                first_name: 'María',
                last_name: 'Feliz',
                email: 'maria@adopt.com',
                password: 'hashedpass456',
                role: 'user'
            });

            const pet = await Pet.create({
                name: 'Bella',
                specie: 'cat',
                birthDate: new Date('2021-06-10'),
                adopted: true,
                owner: user._id
            });

            const adoption = await Adoption.create({
                owner: user._id,
                pet: pet._id
            });

            const response = await request(app)
                .get(`/api/adoptions/${adoption._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.payload).toHaveProperty('owner');
            expect(response.body.payload).toHaveProperty('pet');
        });

        it('Debe retornar 404 si adopción no existe', async () => {
            const fakeId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .get(`/api/adoptions/${fakeId}`)
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Adoption not found');
        });
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        let testUser;
        let testPet;

        beforeEach(async () => {
            // Crear usuario y mascota de prueba para cada test
            testUser = await User.create({
                first_name: 'Carlos',
                last_name: 'Amante de Perros',
                email: 'carlos@adopt.com',
                password: 'hashedpass789',
                role: 'user'
            });

            testPet = await Pet.create({
                name: 'Max',
                specie: 'dog',
                birthDate: new Date('2019-03-20'),
                adopted: false
            });
        });

        it('Debe crear una adopción exitosamente', async () => {
            const response = await request(app)
                .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.message).toBe('Pet adopted');

            // Verificar que la mascota está marcada como adoptada
            const adoptedPet = await Pet.findById(testPet._id);
            expect(adoptedPet.adopted).toBe(true);
            expect(adoptedPet.owner.toString()).toBe(testUser._id.toString());

            // Verificar que se registró la adopción
            const adoptionRecord = await Adoption.findOne({
                owner: testUser._id,
                pet: testPet._id
            });
            expect(adoptionRecord).not.toBeNull();

            // Verificar que el pet se agregó a la lista de pets del usuario
            const updatedUser = await User.findById(testUser._id);
            expect(updatedUser.pets.length).toBeGreaterThan(0);
        });

        it('Debe rechazar adopción si usuario no existe (404)', async () => {
            const fakeUserId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .post(`/api/adoptions/${fakeUserId}/${testPet._id}`)
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('user Not found');
        });

        it('Debe rechazar adopción si mascota no existe (404)', async () => {
            const fakePetId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .post(`/api/adoptions/${testUser._id}/${fakePetId}`)
                .expect(404);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Pet not found');
        });

        it('Debe rechazar adopción si mascota ya fue adoptada (400)', async () => {
            // Marcar mascota como ya adoptada
            await Pet.findByIdAndUpdate(testPet._id, { adopted: true });

            const response = await request(app)
                .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
                .expect(400);

            expect(response.body).toHaveProperty('status', 'error');
            expect(response.body.error).toBe('Pet is already adopted');
        });

        it('Debe permitir que un usuario adopte múltiples mascotas', async () => {
            // Crear segunda mascota
            const secondPet = await Pet.create({
                name: 'Luna',
                specie: 'cat',
                birthDate: new Date('2021-07-10'),
                adopted: false
            });

            // Primera adopción
            await request(app)
                .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
                .expect(200);

            // Segunda adopción
            const response = await request(app)
                .post(`/api/adoptions/${testUser._id}/${secondPet._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'success');

            // Verificar que el usuario tiene 2 mascotas
            const updatedUser = await User.findById(testUser._id);
            expect(updatedUser.pets.length).toBe(2);
        });
    });
});
