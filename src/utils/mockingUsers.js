import { createHash } from './index.js';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

export const generateMockingUsers = async (quantity) => {
    const users = [];
    const roles = ['user', 'admin'];

    for (let i = 0; i < quantity; i++) {
        const encryptedPassword = await createHash('coder123');
        
        const user = {
            _id: new mongoose.Types.ObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            password: encryptedPassword,
            role: roles[Math.floor(Math.random() * roles.length)],
            pets: []
        };

        users.push(user);
    }

    return users;
};
