import { pgTable, serial, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './user.model.js'; 

export const journals = pgTable('journals', {
  id: serial('id').primaryKey(),

  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' }) // FK to users table
    .notNull(),

  title: varchar('title', { length: 200 }), // varchar(200)
  content: text('content'), // text type

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    // CURRENT_TIMESTAMP equivalent
    .default()
    .notNull(),
});
