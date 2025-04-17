import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    console.log('Checking schema...');
    
    const result = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'appropriations'
    `);
    
    console.log('Schema check completed');
    
    return NextResponse.json({
      success: true,
      columns: result.rows
    });
  } catch (error) {
    console.error('Schema check failed:', error);
    return NextResponse.json({
      error: 'Schema check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 