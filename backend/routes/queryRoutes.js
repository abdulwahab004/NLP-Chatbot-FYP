import express from 'express';
import { saveQuery, getUserQueries } from '../controllers/queryController.js';
const router = express.Router();

router.post('/', saveQuery);
router.get('/:userId', getUserQueries);

export default router;