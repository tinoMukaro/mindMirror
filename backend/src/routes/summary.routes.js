import express from 'express';
import { generateWeeklySummaryController } from '#controllers/summary.controller.js';
import { authenticateToken } from '#middleware/auth.middleware.js';
import { summaryRateLimit } from '#middleware/rateLimit.middleware.js';

const router = express.Router();

// POST /summary/weekly - Generate weekly summary from 7 most recent entries
// With rate limiting: 1 request per 10 minutes per user
router.post('/weekly', authenticateToken, summaryRateLimit, generateWeeklySummaryController);

export default router;
