import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        //Establish connection
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connection ')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        
        
    }
}

export default connectDB;