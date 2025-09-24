import logger from '#config/logger.js';
import { db } from '#config/database.js';
import { journals } from '#models/journals.model.js';
import { desc } from 'drizzle-orm';
import axios from 'axios';


const ML_SERVICE_BASE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export const generateInsightsForUser = async (userId) => {
  try {
    logger.info(`Generating insights for user ${userId}`);

    // 1. Fetch the last 5 journal entries for this user 
    const recentEntries = await db
      .select({
        id: journals.id,
        content: journals.content
      })
      .from(journals)
      .where(journals.userId === userId) 
      .orderBy(desc(journals.createdAt)) 
      .limit(5);

    if (recentEntries.length === 0) {
      throw new Error('Not enough entries to generate insights.');
    }

    // 2. Prepare the payload for the ML service
    const payload = {
      user_id: userId.toString(),
      entries: recentEntries.map(entry => ({
        id: entry.id.toString(),
        content: entry.content
      }))
    };

    // 3. Call the ML service
    const response = await axios.post(
      `${ML_SERVICE_BASE_URL}/analyze`,
      payload,
      { timeout: 30000 } // 30 second timeout
    );

    logger.info(`Insights generated successfully for user ${userId}`);
    
    // 4. Return the analysis results
    return response.data;
  } catch (e) {
    logger.error(`Error generating insights for user ${userId}:`, e);
    throw e;
  }
};


export default { generateInsightsForUser };