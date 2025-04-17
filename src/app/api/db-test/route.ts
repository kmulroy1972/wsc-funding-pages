import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const client = await db.connect();
    try {
      // Test basic connectivity
      const result = await client.query('SELECT NOW()');
      
      // Test table access
      const tableTest = await client.query(`
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.tables 
          WHERE table_name = 'appropriations'
        );
      `);

      return NextResponse.json({
        status: 'ok',
        timestamp: result.rows[0].now,
        tableExists: tableTest.rows[0].exists,
        connection: 'successful'
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 