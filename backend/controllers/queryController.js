import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
 let dumyData =[
  {
    "id": 1,
    "audioUrl": "https://example.com/bird1.mp3",
    "result": "Sparrow",
    "userId": 1,
    "createdAt": "2024-02-19T12:34:56Z"
  },
  {
    "id": 2,
    "audioUrl": "https://example.com/bird2.mp3",
    "result": "Robin",
    "userId": 1,
    "createdAt": "2024-02-18T10:12:45Z"
  }
]
export const saveQuery = async (req, res) => {
  const { audioUrl, result, userId } = req.body;
  try {
    const query = await prisma.query.create({
      data: { audioUrl, result, userId },
    });
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserQueries = async (req, res) => {
  const { userId } = req.params;
  
  try {
    // const queries = await prisma.query.findMany({ where: { userId: Number(userId) } });
    res.status(201).json({ data: dumyData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 
