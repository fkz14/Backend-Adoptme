import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

const start = async ()=>{
    try{
        if (!MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined. Please set it before starting the server.');
        }
        await mongoose.connect(MONGO_URI);
        app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
    }catch(err){
        console.error('Error starting server',err);
        process.exit(1);
    }
}

start();
