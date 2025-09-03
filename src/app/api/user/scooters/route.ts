import { NextResponse } from 'next/server';
import userScootersData from '@/data/user-scooters.json';

export async function GET() {
  try {
    // In a real app, this would filter by user ID from session/auth
    return NextResponse.json(userScootersData);
  } catch (error) {
    console.error('Error fetching user scooters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user scooters' },
      { status: 500 }
    );
  }
}