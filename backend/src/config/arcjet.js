import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';
import 'dotenv/config';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
    }),
    slidingWindow({
      mode: 'LIVE',
      interval: '30s',
      max: 10,
    }),
  ],
});

export default aj;
