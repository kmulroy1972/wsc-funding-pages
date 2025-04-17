import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('earmarks')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ error: 'Failed', details: e });
  }
}