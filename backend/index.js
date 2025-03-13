import dotenv from 'dotenv';
import express from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";
import classifyRoutes from './routes/classifyRoutes.js';
import path from "path";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); 

app.use('/api/users', userRoutes);
app.use('/api/queries', queryRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/classify', classifyRoutes);

app.get('/', (req, res) => {
  res.send('Bird Voice Classification API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
