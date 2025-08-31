import { NextResponse } from 'next/server';
import scootersData from '@/data/scooters.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const inStock = searchParams.get('inStock');
    const brand = searchParams.get('brand');
    const maxPrice = searchParams.get('maxPrice');
    
    let filteredScooters = scootersData;
    
    // Filter by stock status if provided
    if (inStock !== null) {
      const stockFilter = inStock === 'true';
      filteredScooters = filteredScooters.filter(scooter => scooter.inStock === stockFilter);
    }
    
    // Filter by brand if provided
    if (brand) {
      filteredScooters = filteredScooters.filter(scooter => 
        scooter.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }
    
    // Filter by max price if provided
    if (maxPrice) {
      const priceLimit = parseFloat(maxPrice);
      filteredScooters = filteredScooters.filter(scooter => scooter.price <= priceLimit);
    }
    
    // Sort by price (lowest first)
    const sortedScooters = filteredScooters.sort((a, b) => a.price - b.price);
    
    return NextResponse.json(sortedScooters);
  } catch (error) {
    console.error('Error fetching scooters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scooters data' },
      { status: 500 }
    );
  }
}