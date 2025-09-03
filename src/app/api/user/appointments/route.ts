import { NextResponse } from 'next/server';
import userAppointmentsData from '@/data/user-appointments.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let filteredAppointments = userAppointmentsData;
    
    // Filter by status if provided
    if (status) {
      filteredAppointments = filteredAppointments.filter(apt => apt.status === status);
    }
    
    // Sort by scheduled date (newest first for upcoming, oldest first for completed)
    const sortedAppointments = filteredAppointments.sort((a, b) => {
      if (status === 'upcoming') {
        return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
      } else {
        return new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime();
      }
    });
    
    return NextResponse.json(sortedAppointments);
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user appointments' },
      { status: 500 }
    );
  }
}