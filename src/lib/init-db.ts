import pool from './db';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS appropriations (
    id SERIAL PRIMARY KEY,
    year INTEGER,
    agency TEXT,
    subunit TEXT,
    subcommittee TEXT,
    account TEXT,
    budget_number TEXT,
    budget_function TEXT,
    recipient TEXT,
    amount NUMERIC,
    location TEXT,
    member TEXT
  )
`;

export async function initializeDatabase() {
  try {
    await pool.query(createTableQuery);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
} 