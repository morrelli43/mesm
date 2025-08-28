import { NextResponse } from 'next/server';
import techniciansData from '@/data/technicians.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const specialization = searchParams.get('specialization');
    
    let filteredTechnicians = techniciansData;
    
    // Filter by status if provided
    if (status) {
      filteredTechnicians = filteredTechnicians.filter(tech => tech.status === status);
    }
    
    // Filter by specialization if provided  
    if (specialization) {
      filteredTechnicians = filteredTechnicians.filter(tech => 
        tech.specialization.toLowerCase().includes(specialization.toLowerCase())
      );
    }
    
    // Sort by rating (highest first)
    const sortedTechnicians = filteredTechnicians.sort((a, b) => b.rating - a.rating);
    
    return NextResponse.json(sortedTechnicians);
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technicians data' },
      { status: 500 }
    );
  }
}