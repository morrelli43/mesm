import { NextResponse } from 'next/server';
import salesData from '@/data/sales.json';

export async function GET() {
  try {
    // Sort by creation date (most recent first)
    const sortedSales = salesData.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedSales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}