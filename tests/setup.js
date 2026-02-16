/**
 * Setup para tests - Configura mongodb-memory-server
 * Permite ejecutar tests sin necesidad de una BD real
 */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

/**
 * Conecta a BD en memoria antes de los tests
 */
export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Memory Server:', error);
        throw error;
    }
};

/**
 * Desconecta de BD en memoria después de los tests
 */
export const disconnectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        if (mongoServer) {
            await mongoServer.stop();
        }
    } catch (error) {
        console.error('Error disconnecting from MongoDB Memory Server:', error);
        throw error;
    }
};

/**
 * Limpia todas las colleciiones de la BD (entre tests)
 */
export const clearDB = async () => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    } catch (error) {
        console.error('Error clearing database:', error);
        throw error;
    }
};
