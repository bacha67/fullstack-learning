import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the .env file');
}

const sql = neon(process.env.DATABASE_URL);
export const pool = drizzle(sql); // pool naming preferred as requested
export const db = pool; // keeps existing API compatibility
