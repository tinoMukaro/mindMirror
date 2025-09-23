import { z } from 'zod';

export const journalIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'Journal ID must be a valid number')
    .transform(Number)
    .refine(val => val > 0, 'Journal ID must be a positive number'),
});

export const createJournalSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters')
    .trim(),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10,000 characters')
    .trim(),
});

export const updateJournalSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be less than 255 characters')
      .trim()
      .optional(),
    content: z
      .string()
      .min(1, 'Content cannot be empty')
      .max(10000, 'Content must be less than 10,000 characters')
      .trim()
      .optional(),
  })
  .refine(
    data => {
      // Ensure at least one field is provided for update
      return Object.keys(data).length > 0;
    },
    {
      message: 'At least one field (title or content) must be provided for update',
    }
  )
  .refine(
    data => {
      // If title is provided, it must not be empty
      if (data.title !== undefined) {
        return data.title.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Title cannot be empty if provided',
      path: ['title'],
    }
  )
  .refine(
    data => {
      // If content is provided, it must not be empty
      if (data.content !== undefined) {
        return data.content.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Content cannot be empty if provided',
      path: ['content'],
    }
  );