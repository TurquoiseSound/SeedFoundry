import { NextResponse } from 'next/server';
import { fetchGoals } from '../../../lib/supabaseData';

export async function GET() {
  try {
    const goals = await fetchGoals();
    return NextResponse.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}