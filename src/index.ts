import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import quizRoutes from './Routes/Routes';
import mongoose from 'mongoose';
dotenv.config();
const uri ='mongodb+srv://harshil:abc123%40%23@cluster0.vws6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
