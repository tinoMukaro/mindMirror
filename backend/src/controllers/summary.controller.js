import logger from '#config/logger.js';
import { getRecentJournals } from '#services/journals.service.js';
import { generateWeeklySummary } from '#services/ai.service.js';

/**
 * Generate a weekly summary from user's 7 most recent journal entries
 */
export const generateWeeklySummaryController = async (req, res, next) => {
  try {
    logger.info('Generating weekly summary...');

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to generate summaries',
      });
    }

    const userId = req.user.id;

    // 1. Get the 7 most recent journal entries
    const recentEntries = await getRecentJournals(userId);
    
    logger.info(`Processing ${recentEntries.length} entries for summary`);

    // 2. Generate AI summary
    const summary = await generateWeeklySummary(recentEntries);

    // 3. Return the summary (we're not saving it as per your requirement)
    logger.info(`Weekly summary generated successfully for user ${userId}`);
    
    res.json({
      message: 'Weekly summary generated successfully',
      summary,
      entriesProcessed: recentEntries.length,
      period: '7 most recent entries'
    });

  } catch (error) {
    logger.error(`Error generating weekly summary: ${error.message}`);

    // Handle specific errors with user-friendly messages
    if (error.message.includes('No journal entries')) {
      return res.status(404).json({
        error: 'No entries found',
        message: 'You need to write some journal entries before generating a summary'
      });
    } else if (error.message.includes('rate limit') || error.message.includes('busy')) {
      return res.status(429).json({
        error: 'Service busy',
        message: 'AI service is currently busy. Please try again in a few moments.'
      });
    } else if (error.message.includes('authentication') || error.message.includes('configuration')) {
      return res.status(500).json({
        error: 'Service error',
        message: 'Summary service is temporarily unavailable'
      });
    }

    next(error);
  }
};
