import logger from '#config/logger.js';
import { generateInsightsForUser } from '#services/insights.service.js';

export const generateInsights = async (req, res, next) => {
  try {
    logger.info(`Generating insights for user ${req.user?.id}`);

    // Authorization check
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to generate insights',
      });
    }

    const userId = req.user.id;

    // Call our service to get insights from the ML microservice
    const insights = await generateInsightsForUser(userId);

    // TODO: Save these insights to the user_insights table (Next Step!)
    // const saveQuery = `INSERT INTO user_insights ...`
    // await pool.query(saveQuery, [userId, insights.summary, ...]);

    logger.info(`Insights generated successfully for user ${userId}`);
    res.json({
      message: 'Insights generated successfully',
      insights
    });

  } catch (e) {
    logger.error(`Error generating insights: ${e.message}`);

    if (e.message === 'Not enough entries to generate insights.') {
      return res.status(400).json({ 
        error: 'Insufficient data',
        message: 'You need at least one journal entry to generate insights'
      });
    }

    next(e);
  }
};