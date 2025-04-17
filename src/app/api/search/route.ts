import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Search term is required' },
        { status: 400 }
      );
    }

    // Search across multiple columns
    const { data, error } = await supabase
      .from('earmarks')
      .select('*')
      .or(`agency.ilike.%${query}%, subunit.ilike.%${query}%, subcommittee.ilike.%${query}%`)
      .order('year', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      results: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}