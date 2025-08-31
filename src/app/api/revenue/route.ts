import { NextResponse } from 'next/server';
import revenueData from '@/data/revenue.json';

export async function GET() {
  try {
    return NextResponse.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    );
  }
}