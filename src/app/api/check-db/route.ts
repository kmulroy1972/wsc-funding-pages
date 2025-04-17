import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    // Check if the table exists and get its structure
    const tableCheck = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'appropriations'
    `);

    return NextResponse.json({ 
      message: 'Database check successful',
      schema: tableCheck.rows
    });

  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check database', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 