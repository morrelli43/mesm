import { NextResponse } from 'next/server';
import scootersData from '@/data/scooters.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Find the scooter by ID
    const scooter = scootersData.find(scooter => scooter.id === id);
    
    if (!scooter) {
      return NextResponse.json(
        { error: 'Scooter not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(scooter);
  } catch (error) {
    console.error('Error fetching scooter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scooter data' },
      { status: 500 }
    );
  }
}