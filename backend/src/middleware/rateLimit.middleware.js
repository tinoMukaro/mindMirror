import rateLimit from 'express-rate-limit';

// Rate limiter for summary generation (1 request per 10 minutes per user)
export const summaryRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1, // Limit each user to 1 request per windowMs
  message: {
    error: 'Rate limit exceeded',
    message: 'Please wait 10 minutes before generating another summary'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID for rate limiting (so limits are per user)
    return req.user?.id || req.ip;
  }
});
