import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    // Check if table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'appropriations'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      return NextResponse.json({
        error: 'Table does not exist',
        message: 'The appropriations table was not found in the database'
      }, { status: 404 });
    }

    // Get table structure
    const columns = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'appropriations';
    `);

    return NextResponse.json({
      success: true,
      tableExists: true,
      columns: columns.rows
    });
  } catch (error) {
    console.error('Table check failed:', error);
    return NextResponse.json({
      error: 'Table check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 