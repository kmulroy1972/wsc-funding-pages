// src/app/api/test/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Simple count query
    const { count, error } = await supabase
      .from('earmarks')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ 
        error: error.message,
        details: error
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: count,
      message: 'Successfully connected to Supabase'
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}