import express from 'express';
import { generateInsights } from '#controllers/insights.controller.js';
import { authenticateToken } from '#middleware/auth.middleware.js';

const router = express.Router();


router.use(authenticateToken);

router.post('/generate', generateInsights);

export default router;