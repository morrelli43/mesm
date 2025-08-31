import { NextResponse } from 'next/server';
import bookingsData from '@/data/bookings.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let filteredBookings = bookingsData;
    
    // Filter by status if provided
    if (status) {
      filteredBookings = bookingsData.filter(booking => booking.status === status);
    }
    
    // Sort by creation date (most recent first)
    const sortedBookings = filteredBookings.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings data' },
      { status: 500 }
    );
  }
}