// src/app/api/flights/search/route.js
import { NextResponse } from 'next/server';
import amadeusAPI from '@/lib/amadeus';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const originLocationCode = searchParams.get('originLocationCode');
  const destinationLocationCode = searchParams.get('destinationLocationCode');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const adults = searchParams.get('adults') || 1;
  
  if (!originLocationCode || !destinationLocationCode || !departureDate) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }
  
  try {
    const flightData = await amadeusAPI.searchFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults
    });
    
    return NextResponse.json(flightData);
  } catch (error) {
    console.error('Error searching flights:', error);
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}
