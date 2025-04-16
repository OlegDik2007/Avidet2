'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'

// Define TypeScript interfaces for our state
interface FlightData {
  from: string;
  to: string;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: string;
  class: string;
}

interface HotelData {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  rooms: string;
  guests: string;
}

interface TourData {
  destination: string;
  startDate: Date | null;
  duration: string;
  travelers: string;
}

interface CarData {
  pickupLocation: string;
  pickupDate: Date | null;
  dropoffDate: Date | null;
  carType: string;
}

interface AirportOptions {
  origin: any[];
  destination: any[];
}

interface FlightSearchResult {
  itineraries: {
    segments: {
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
    }[];
    duration: string;
  }[];
  price: {
    total: string;
    currency: string;
  };
}

export default function BookingPage() {
  const [bookingType, setBookingType] = useState<string>('flights')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<FlightSearchResult[]>([])
  const [airportOptions, setAirportOptions] = useState<AirportOptions>({
    origin: [],
    destination: []
  })
  const [isSearchingOrigin, setIsSearchingOrigin] = useState<boolean>(false)
  const [isSearchingDestination, setIsSearchingDestination] = useState<boolean>(false)
  
  // Flight booking state
  const [flightData, setFlightData] = useState<FlightData>({
    from: '',
    to: '',
    departDate: null,
    returnDate: null,
    passengers: '1',
    class: 'economy'
  })
  
  // Hotel booking state
  const [hotelData, setHotelData] = useState<HotelData>({
    destination: '',
    checkIn: null,
    checkOut: null,
    rooms: '1',
    guests: '1'
  })
  
  // Tour booking state
  const [tourData, setTourData] = useState<TourData>({
    destination: '',
    startDate: null,
    duration: '7',
    travelers: '1'
  })
  
  // Car rental state
  const [carData, setCarData] = useState<CarData>({
    pickupLocation: '',
    pickupDate: null,
    dropoffDate: null,
    carType: 'economy'
  })

  const handleFlightChange = (field: string, value: any) => {
    setFlightData(prev => ({
      ...prev,
      [field]: value
    }))

    // If changing origin or destination, search for airports
    if (field === 'from' && value.length >= 2) {
      searchAirports(value, 'origin')
    } else if (field === 'to' && value.length >= 2) {
      searchAirports(value, 'destination')
    }
  }

  const searchAirports = async (keyword: string, type: 'origin' | 'destination') => {
    if (!keyword || keyword.length < 2) return
    
    if (type === 'origin') {
      setIsSearchingOrigin(true)
    } else {
      setIsSearchingDestination(true)
    }
    
    try {
      const response = await fetch(`/api/flights/airports?keyword=${encodeURIComponent(keyword)}`)
      const data = await response.json()
      
      if (data && data.data) {
        setAirportOptions(prev => ({
          ...prev,
          [type]: data.data
        }))
      }
    } catch (error) {
      console.error(`Error searching ${type} airports:`, error)
    } finally {
      if (type === 'origin') {
        setIsSearchingOrigin(false)
      } else {
        setIsSearchingDestination(false)
      }
    }
  }

  const handleHotelChange = (field: string, value: any) => {
    setHotelData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTourChange = (field: string, value: any) => {
    setTourData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCarChange = (field: string, value: any) => {
    setCarData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFlightSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSearchResults([])
    
    if (!flightData.from || !flightData.to || !flightData.departDate) {
      alert('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }
    
    try {
      const params = new URLSearchParams({
        originLocationCode: flightData.from,
        destinationLocationCode: flightData.to,
        departureDate: format(flightData.departDate, 'yyyy-MM-dd'),
        adults: flightData.passengers
      })
      
      if (flightData.returnDate) {
        params.append('returnDate', format(flightData.returnDate, 'yyyy-MM-dd'))
      }
      
      const response = await fetch(`/api/flights/search?${params.toString()}`)
      const data = await response.json()
      
      if (data && data.data) {
        setSearchResults(data.data)
        alert(`Found ${data.data.length} flights matching your criteria.`)
      }
    } catch (error) {
      console.error('Error searching flights:', error)
      alert('Failed to search flights. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (bookingType === 'flights') {
      handleFlightSearch(e)
    } else {
      setIsSubmitting(true)
      
      // Simulate API call for other booking types
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Booking request submitted. We will process your request and send confirmation details shortly.')
      
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Book Your Travel</h1>
        <p className="text-center text-gray-600 mb-10">
          Find and book the perfect flights, accommodations, tours, and car rentals for your journey.
        </p>
        
        <Card className="p-6">
          <Tabs defaultValue="flights" onValueChange={setBookingType} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="tours">Tours</TabsTrigger>
              <TabsTrigger value="cars">Car Rentals</TabsTrigger>
            </TabsList>
            
            {/* Flights Booking Form */}
            <TabsContent value="flights">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">From (Airport Code)</label>
                    <Input 
                      placeholder="e.g., JFK, LAX, LHR" 
                      value={flightData.from}
                      onChange={(e) => handleFlightChange('from', e.target.value)}
                      required 
                    />
                    {isSearchingOrigin && <p className="text-sm mt-1">Searching airports...</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">To (Airport Code)</label>
                    <Input 
                      placeholder="e.g., CDG, SFO, NRT" 
                      value={flightData.to}
                      onChange={(e) => handleFlightChange('to', e.target.value)}
                      required 
                    />
                    {isSearchingDestination && <p className="text-sm mt-1">Searching airports...</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Departure Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {flightData.departDate ? format(flightData.departDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={flightData.departDate || undefined}
                          onSelect={(date) => handleFlightChange('departDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Return Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {flightData.returnDate ? format(flightData.returnDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={flightData.returnDate || undefined}
                          onSelect={(date) => handleFlightChange('returnDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Passengers</label>
                    <Select 
                      value={flightData.passengers} 
                      onValueChange={(value) => handleFlightChange('passengers', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5">5+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Class</label>
                    <Select 
                      value={flightData.class} 
                      onValueChange={(value) => handleFlightChange('class', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium">Premium Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Searching...' : 'Search Flights'}
                </Button>
              </form>

              {searchResults.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Flight Results</h2>
                  <div className="space-y-4">
                    {searchResults.map((flight, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <p className="font-semibold">
                              {flight.itineraries[0].segments[0].departure.iataCode} → 
                              {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()} - 
                              {new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleString()}
                            </p>
                            <p className="text-sm">
                              {flight.itineraries[0].duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              {flight.price.total} {flight.price.currency}
                            </p>
                            <Button size="sm" className="mt-2">Select</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Hotels Booking Form */}
            <TabsContent value="hotels">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Destination</label>
                  <Input 
                    placeholder="City or Hotel Name" 
                    value={hotelData.destination}
                    onChange={(e) => handleHotelChange('destination', e.target.value)}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {hotelData.checkIn ? format(hotelData.checkIn, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={hotelData.checkIn || undefined}
                          onSelect={(date) => handleHotelChange('checkIn', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {hotelData.checkOut ? format(hotelData.checkOut, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={hotelData.checkOut || undefined}
                          onSelect={(date) => handleHotelChange('checkOut', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rooms</label>
                    <Select 
                      value={hotelData.rooms} 
                      onValueChange={(value) => handleHotelChange('rooms', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of rooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4">4+ Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <Select 
                      value={hotelData.guests} 
                      onValueChange={(value) => handleHotelChange('guests', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Searching...' : 'Search Hotels'}
                </Button>
              </form>
            </TabsContent>
            
            {/* Tours Booking Form */}
            <TabsContent value="tours">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Destination</label>
                  <Input 
                    placeholder="City or Country" 
                    value={tourData.destination}
                    onChange={(e) => handleTourChange('destination', e.target.value)}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tourData.startDate ? format(tourData.startDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={tourData.startDate || undefined}
                          onSelect={(date) => handleTourChange('startDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <Select 
                      value={tourData.duration} 
                      onValueChange={(value) => handleTourChange('duration', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="10">10 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Travelers</label>
                  <Select 
                    value={tourData.travelers} 
                    onValueChange={(value) => handleTourChange('travelers', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Traveler</SelectItem>
                      <SelectItem value="2">2 Travelers</SelectItem>
                      <SelectItem value="3">3 Travelers</SelectItem>
                      <SelectItem value="4">4 Travelers</SelectItem>
                      <SelectItem value="5">5+ Travelers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Searching...' : 'Search Tours'}
                </Button>
              </form>
            </TabsContent>
            
            {/* Car Rentals Booking Form */}
            <TabsContent value="cars">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Pickup Location</label>
                  <Input 
                    placeholder="City or Airport" 
                    value={carData.pickupLocation}
                    onChange={(e) => handleCarChange('pickupLocation', e.target.value)}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pickup Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {carData.pickupDate ? format(carData.pickupDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={carData.pickupDate || undefined}
                          onSelect={(date) => handleCarChange('pickupDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Drop-off Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {carData.dropoffDate ? format(carData.dropoffDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={carData.dropoffDate || undefined}
                          onSelect={(date) => handleCarChange('dropoffDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Car Type</label>
                  <Select 
                    value={carData.carType} 
                    onValueChange={(value) => handleCarChange('carType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="midsize">Midsize</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Searching...' : 'Search Cars'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
