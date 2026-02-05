import { Router } from 'express';
import { generateMockingUsers } from '../utils/mockingUsers.js';
import { petsService, usersService } from '../services/index.js';
import mongoose from 'mongoose';

const router = Router();

// Generar datos de mascotas simuladas
const generateMockingPets = (quantity) => {
    const pets = [];
    const species = ['dog', 'cat', 'rabbit', 'hamster', 'bird', 'turtle'];

    for (let i = 0; i < quantity; i++) {
        const pet = {
            _id: new mongoose.Types.ObjectId(),
            name: `Pet ${i + 1}`,
            specie: species[Math.floor(Math.random() * species.length)],
            birthDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            adopted: false,
            owner: null,
            image: null
        };

        pets.push(pet);
    }

    return pets;
};

// GET /api/mocks/mockingpets - Retorna 100 mascotas simuladas
router.get('/mockingpets', async (req, res) => {
    try {
        const mockingPets = generateMockingPets(100);
        res.send({ 
            status: 'success', 
            payload: mockingPets 
        });
    } catch (error) {
        res.status(500).send({ 
            status: 'error', 
            error: error.message 
        });
    }
});

// GET /api/mocks/mockingusers - Retorna 50 usuarios simulados (solo datos, sin insertar)
router.get('/mockingusers', async (req, res) => {
    try {
        const mockingUsers = await generateMockingUsers(50);
        res.send({ 
            status: 'success', 
            payload: mockingUsers 
        });
    } catch (error) {
        res.status(500).send({ 
            status: 'error', 
            error: error.message 
        });
    }
});

// POST /api/mocks/generateData - Inserta datos reales en MongoDB
router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;

        // Validar que los parámetros sean números válidos
        if (users === undefined || pets === undefined || typeof users !== 'number' || typeof pets !== 'number') {
            return res.status(400).send({ 
                status: 'error', 
                error: 'Invalid request. Send users and pets as numbers.' 
            });
        }

        if (users < 0 || pets < 0) {
            return res.status(400).send({ 
                status: 'error', 
                error: 'users and pets must be positive numbers.' 
            });
        }

        let usersInserted = 0;
        let petsInserted = 0;

        // Generar e insertar usuarios
        if (users > 0) {
            const mockingUsers = await generateMockingUsers(users);
            await usersService.create(mockingUsers);
            usersInserted = users;
        }

        // Generar e insertar mascotas
        if (pets > 0) {
            const mockingPets = generateMockingPets(pets);
            await petsService.create(mockingPets);
            petsInserted = pets;
        }

        res.send({
            status: 'success',
            message: `${usersInserted} users and ${petsInserted} pets were successfully inserted.`,
            data: {
                usersInserted,
                petsInserted
            }
        });
    } catch (error) {
        res.status(500).send({ 
            status: 'error', 
            error: error.message 
        });
    }
});

export default router;
