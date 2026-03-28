import { not } from 'drizzle-orm';
import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  make: varchar('make'),
  model: varchar('model'),
  year: integer('year'),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});