import logger from '#config/logger.js';
import { db } from '#config/database.js';
import { journals } from '#models/journals.model.js';
import { eq, and } from 'drizzle-orm';

// Input validation for journal entries
const validateEntryInput = (title, content) => {
  if (!title || !content) {
    throw new Error('Title and content are required');
  }
  
  if (title.length > 255) {
    throw new Error('Title must be less than 255 characters');
  }
  
  if (content.length > 10000) {
    throw new Error('Content must be less than 10,000 characters');
  }
};

// Create new journal entry
export const createJournal = async (user_id, title, content) => {
  try {
    validateEntryInput(title, content);
    
    const [journal] = await db
      .insert(journals)
      .values({
        userId: user_id,  // Changed from user_id to userId
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date()  // Changed from updated_at to updatedAt
      })
      .returning({
        id: journals.id,
        userId: journals.userId,  // Changed from user_id to userId
        title: journals.title,
        content: journals.content,
        createdAt: journals.createdAt,  // Changed from created_at to createdAt
        updatedAt: journals.updatedAt   // Changed from updated_at to updatedAt
      });

    logger.info(`Journal entry created for user ${user_id}`);
    return journal;
  } catch (e) {
    logger.error('Error creating journal entry:', e);
    throw e;
  }
};

// Get journal by ID
export const getJournalById = async (id) => {
  try {
    if (!id) {
      throw new Error('Journal ID is required');
    }
    
    const [journal] = await db
      .select({
        id: journals.id,
        userId: journals.userId,  // Changed from user_id to userId
        title: journals.title,
        content: journals.content,
        createdAt: journals.createdAt,  // Changed from created_at to createdAt
        updatedAt: journals.updatedAt   // Changed from updated_at to updatedAt
      })
      .from(journals)
      .where(eq(journals.id, id))
      .limit(1);

    if (!journal) {
      throw new Error('Journal entry not found');
    }

    return journal;
  } catch (e) {
    logger.error(`Error getting journal by id ${id}:`, e);
    throw e;
  }
};

// Get all journals by user
export const getJournalsByUser = async (user_id) => {
  try {
    if (!user_id) {
      throw new Error('User ID is required');
    }
    
    return await db
      .select({
        id: journals.id,
        userId: journals.userId,  // Changed from user_id to userId
        title: journals.title,
        content: journals.content,
        createdAt: journals.createdAt,  // Changed from created_at to createdAt
        updatedAt: journals.updatedAt   // Changed from updated_at to updatedAt
      })
      .from(journals)
      .where(eq(journals.userId, user_id))  // Changed from user_id to userId
      .orderBy(journals.createdAt);  // Changed from created_at to createdAt
  } catch (e) {
    logger.error(`Error getting journals for user ${user_id}:`, e);
    throw e;
  }
};

// Update journal entry with user verification
export const updateJournal = async (id, user_id, title, content) => {
  try {
    validateEntryInput(title, content);
    
    const [updatedJournal] = await db
      .update(journals)
      .set({
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date()  // Changed from updated_at to updatedAt
      })
      .where(and(eq(journals.id, id), eq(journals.userId, user_id)))  // Changed from user_id to userId
      .returning({
        id: journals.id,
        userId: journals.userId,  // Changed from user_id to userId
        title: journals.title,
        content: journals.content,
        createdAt: journals.createdAt,  // Changed from created_at to createdAt
        updatedAt: journals.updatedAt   // Changed from updated_at to updatedAt
      });

    if (!updatedJournal) {
      throw new Error('Journal entry not found or you don\'t have permission to update it');
    }

    logger.info(`Journal entry ${id} updated successfully`);
    return updatedJournal;
  } catch (e) {
    logger.error(`Error updating journal ${id}:`, e);
    throw e;
  }
};

// Delete journal entry with user verification
export const deleteJournal = async (id, user_id) => {
  try {
    if (!id || !user_id) {
      throw new Error('Journal ID and User ID are required');
    }
    
    const [deletedJournal] = await db
      .delete(journals)
      .where(and(eq(journals.id, id), eq(journals.userId, user_id)))  // Changed from user_id to userId
      .returning({
        id: journals.id,
        title: journals.title
      });

    if (!deletedJournal) {
      throw new Error('Journal entry not found or you don\'t have permission to delete it');
    }

    logger.info(`Journal entry ${id} deleted successfully`);
    return deletedJournal;
  } catch (e) {
    logger.error(`Error deleting journal ${id}:`, e);
    throw e;
  }
};

// Get journal by ID with user verification
export const getUserJournalById = async (id, user_id) => {
  try {
    if (!id || !user_id) {
      throw new Error('Journal ID and User ID are required');
    }
    
    const [journal] = await db
      .select({
        id: journals.id,
        userId: journals.userId,  // Changed from user_id to userId
        title: journals.title,
        content: journals.content,
        createdAt: journals.createdAt,  // Changed from created_at to createdAt
        updatedAt: journals.updatedAt   // Changed from updated_at to updatedAt
      })
      .from(journals)
      .where(and(eq(journals.id, id), eq(journals.userId, user_id)))  // Changed from user_id to userId
      .limit(1);

    if (!journal) {
      throw new Error('Journal entry not found');
    }

    return journal;
  } catch (e) {
    logger.error(`Error getting user journal ${id}:`, e);
    throw e;
  }
};

/**
 * Get the 7 most recent journal entries for a user (for weekly summaries)
 * @param {string} user_id - User ID
 * @returns {Promise<Array>} - Array of 7 most recent journal entries
 */
export const getRecentJournals = async (user_id) => {
  try {
    if (!user_id) {
      throw new Error('User ID is required');
    }

    const entries = await db
      .select({
        id: journals.id,
        userId: journals.userId,
        title: journals.title,
        content: journals.content,
        createdAt: journals.createdAt,
        updatedAt: journals.updatedAt
      })
      .from(journals)
      .where(eq(journals.userId, user_id))
      .orderBy(journals.createdAt) // Get oldest first for chronological context
      .limit(7); // Get exactly 7 most recent entries

    logger.info(`Found ${entries.length} recent journal entries for user ${user_id}`);
    
    if (entries.length === 0) {
      throw new Error('No journal entries found for summary');
    }

    return entries;
  } catch (e) {
    logger.error(`Error getting recent journals for user ${user_id}:`, e);
    throw e;
  }
};
