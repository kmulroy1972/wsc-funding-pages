import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export const runtime = 'edge';

export async function GET() {
  try {
    console.log('Testing connection...');
    
    const result = await db.query('SELECT 1 as test');
    
    console.log('Connection test successful');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      test: result.rows[0].test
    });
  } catch (error) {
    console.error('Connection test failed:', error);
    return NextResponse.json({
      error: 'Connection test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 