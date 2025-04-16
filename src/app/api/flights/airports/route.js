// src/app/api/flights/airports/route.js
import { NextResponse } from 'next/server';
import amadeusAPI from '@/lib/amadeus';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  
  if (!keyword || keyword.length < 2) {
    return NextResponse.json(
      { error: 'Keyword must be at least 2 characters' },
      { status: 400 }
    );
  }
  
  try {
    const airportData = await amadeusAPI.getAirportSearch(keyword);
    return NextResponse.json(airportData);
  } catch (error) {
    console.error('Error searching airports:', error);
    return NextResponse.json(
      { error: 'Failed to search airports' },
      { status: 500 }
    );
  }
}
