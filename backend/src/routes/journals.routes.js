import express from 'express';
import {
  createJournalEntry,
  getUserJournalEntries,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from '#controllers/journals.controller.js';
import { authenticateToken } from '#middleware/auth.middleware.js';

const router = express.Router();

// POST /journals - Create a new journal entry (authenticated users only)
router.post('/', authenticateToken, createJournalEntry);

// GET /journals - Get all journal entries for the authenticated user
router.get('/', authenticateToken, getUserJournalEntries);

// GET /journals/:id - Get specific journal entry by ID (user must own the entry)
router.get('/:id', authenticateToken, getJournalEntry);

// PUT /journals/:id - Update journal entry by ID (user must own the entry)
router.put('/:id', authenticateToken, updateJournalEntry);

// DELETE /journals/:id - Delete journal entry by ID (user must own the entry)
router.delete('/:id', authenticateToken, deleteJournalEntry);

export default router;