import { NextResponse } from 'next/server';
import { fetchEntityTypes, fetchBusinessModels, fetchFundingOptions } from '../../../lib/supabaseData';

export async function GET() {
  try {
    const [entityTypes, businessModels, fundingOptions] = await Promise.all([
      fetchEntityTypes(),
      fetchBusinessModels(),
      fetchFundingOptions(),
    ]);

    const allItems = [...entityTypes, ...businessModels, ...fundingOptions];
    return NextResponse.json(allItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}