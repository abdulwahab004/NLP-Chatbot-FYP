import dotenv from 'dotenv';
import express from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes.js';
import path from "path";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); 

app.use('/api/users', userRoutes);


app.get('/', (req, res) => { 
  res.send('Bird Voice Classification API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
