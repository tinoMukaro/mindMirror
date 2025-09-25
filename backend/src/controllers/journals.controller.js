import logger from '#config/logger.js';
import {
  createJournal,
  getJournalsByUser,
  getUserJournalById,
  updateJournal,
  deleteJournal,
} from '#services/journals.service.js';
import {
  journalIdSchema,
  createJournalSchema,
  updateJournalSchema,
} from '#validations/journals.validation.js';
import { formatValidationError } from '#utils/format.js';

export const createJournalEntry = async (req, res, next) => {
  try {
    logger.info('Creating new journal entry...');

    // Validate the request body
    const validationResult = createJournalSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to create journal entries',
      });
    }

    const userId = req.user.id;
    const { title, content } = validationResult.data;

    const newEntry = await createJournal(userId, title, content);

    logger.info(`Journal entry created for user ${userId}`);
    res.status(201).json({
      message: 'Journal entry created successfully',
      journal: newEntry,
    });
  } catch (e) {
    logger.error(`Error creating journal entry: ${e.message}`);

    if (e.message.includes('required') || e.message.includes('characters')) {
      return res.status(400).json({ error: e.message });
    }

    next(e);
  }
};

export const getUserJournalEntries = async (req, res, next) => {
  try {
    logger.info('Getting user journal entries...');

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to view journal entries',
      });
    }

    const userId = req.user.id;
    const entries = await getJournalsByUser(userId);

    logger.info(`Retrieved ${entries.length} journal entries for user ${userId}`);
    res.json({
      message: 'Journal entries retrieved successfully',
      journals: entries,
      count: entries.length,
    });
  } catch (e) {
    logger.error(`Error getting user journal entries: ${e.message}`);
    next(e);
  }
};

export const getJournalEntry = async (req, res, next) => {
  try {
    logger.info(`Getting journal entry by id: ${req.params.id}`);

    // Validate the journal ID parameter
    const validationResult = journalIdSchema.safeParse({ id: req.params.id });

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to view journal entries',
      });
    }

    const { id } = validationResult.data;
    const userId = req.user.id;

    const entry = await getUserJournalById(id, userId);

    logger.info(`Journal entry ${id} retrieved successfully`);
    res.json({
      message: 'Journal entry retrieved successfully',
      journal: entry,
    });
  } catch (e) {
    logger.error(`Error getting journal entry: ${e.message}`);

    if (e.message === 'Journal entry not found') {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    next(e);
  }
};

export const updateJournalEntry = async (req, res, next) => {
  try {
    logger.info(`Updating journal entry: ${req.params.id}`);

    // Validate the journal ID parameter
    const idValidationResult = journalIdSchema.safeParse({ id: req.params.id });

    if (!idValidationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(idValidationResult.error),
      });
    }

    // Validate the update data
    const updateValidationResult = updateJournalSchema.safeParse(req.body);

    if (!updateValidationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(updateValidationResult.error),
      });
    }

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to update journal entries',
      });
    }

    const { id } = idValidationResult.data;
    const userId = req.user.id;
    const { title, content } = updateValidationResult.data;

    const updatedEntry = await updateJournal(id, userId, title, content);

    logger.info(`Journal entry ${id} updated successfully`);
    res.json({
      message: 'Journal entry updated successfully',
      journal: updatedEntry,
    });
  } catch (e) {
    logger.error(`Error updating journal entry: ${e.message}`);

    if (e.message.includes('required') || e.message.includes('characters')) {
      return res.status(400).json({ error: e.message });
    }

    if (e.message.includes('not found') || e.message.includes('permission')) {
      return res.status(404).json({ error: e.message });
    }

    next(e);
  }
};

export const deleteJournalEntry = async (req, res, next) => {
  try {
    logger.info(`Deleting journal entry: ${req.params.id}`);

    // Validate the journal ID parameter
    const validationResult = journalIdSchema.safeParse({ id: req.params.id });

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to delete journal entries',
      });
    }

    const { id } = validationResult.data;
    const userId = req.user.id;

    const deletedEntry = await deleteJournal(id, userId);

    logger.info(`Journal entry ${id} deleted successfully`);
    res.json({
      message: 'Journal entry deleted successfully',
      journal: deletedEntry,
    });
  } catch (e) {
    logger.error(`Error deleting journal entry: ${e.message}`);

    if (e.message.includes('not found') || e.message.includes('permission')) {
      return res.status(404).json({ error: e.message });
    }

    next(e);
  }
};