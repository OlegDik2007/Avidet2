'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 px-4 py-16 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Discover Your Next Adventure
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-xl">
            Book flights, hotels, tours, and car rentals all in one place with AvideTravel
          </p>
          <div className="mt-10">
            <Card className="p-4 mx-auto max-w-4xl bg-white/95 text-black">
              <Tabs defaultValue="flights" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="flights">Flights</TabsTrigger>
                  <TabsTrigger value="hotels">Hotels</TabsTrigger>
                  <TabsTrigger value="tours">Tours</TabsTrigger>
                  <TabsTrigger value="cars">Car Rentals</TabsTrigger>
                </TabsList>
                <TabsContent value="flights" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="From" />
                    <Input placeholder="To" />
                    <Input type="date" placeholder="Departure" />
                    <Button className="w-full" onClick={() => window.location.href = '/booking'}>Search Flights</Button>
                  </div>
                </TabsContent>
                <TabsContent value="hotels" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="Destination" />
                    <Input type="date" placeholder="Check-in" />
                    <Input type="date" placeholder="Check-out" />
                    <Button className="w-full" onClick={() => window.location.href = '/booking'}>Search Hotels</Button>
                  </div>
                </TabsContent>
                <TabsContent value="tours" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="Destination" />
                    <Input type="date" placeholder="Start Date" />
                    <Input placeholder="Duration" />
                    <Button className="w-full" onClick={() => window.location.href = '/booking'}>Search Tours</Button>
                  </div>
                </TabsContent>
                <TabsContent value="cars" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="Pick-up Location" />
                    <Input type="date" placeholder="Pick-up Date" />
                    <Input type="date" placeholder="Drop-off Date" />
                    <Button className="w-full" onClick={() => window.location.href = '/booking'}>Search Cars</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flight Booking</h3>
                <p className="text-gray-600">Find the best deals on flights to destinations worldwide.</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M19 7h.01"></path>
                    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                    <path d="M2 7h20"></path>
                    <path d="M2 11h20"></path>
                    <path d="M2 15h20"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Hotel Reservations</h3>
                <p className="text-gray-600">Book accommodations from luxury hotels to budget-friendly options.</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m4.93 4.93 4.24 4.24"></path>
                    <path d="m14.83 9.17 4.24-4.24"></path>
                    <path d="m14.83 14.83 4.24 4.24"></path>
                    <path d="m9.17 14.83-4.24 4.24"></path>
                    <circle cx="12" cy="12" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tour Packages</h3>
                <p className="text-gray-600">Explore curated tour packages for unforgettable experiences.</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Car Rentals</h3>
                <p className="text-gray-600">Rent vehicles for convenient transportation during your travels.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our AI-powered destination guides to plan your perfect trip
          </p>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="h-48 bg-blue-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">Paris</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Paris, France</h3>
                    <p className="text-sm text-gray-600 mb-4">Explore the city of lights with our comprehensive guide.</p>
                    <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="h-48 bg-green-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">Tokyo</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Tokyo, Japan</h3>
                    <p className="text-sm text-gray-600 mb-4">Discover the blend of tradition and innovation in Tokyo.</p>
                    <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="h-48 bg-yellow-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">New York</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">New York, USA</h3>
                    <p className="text-sm text-gray-600 mb-4">Experience the vibrant culture of the Big Apple.</p>
                    <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="h-48 bg-purple-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">Bali</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Bali, Indonesia</h3>
                    <p className="text-sm text-gray-600 mb-4">Relax on beautiful beaches and explore rich culture.</p>
                    <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="h-48 bg-red-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">Rome</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Rome, Italy</h3>
                    <p className="text-sm text-gray-600 mb-4">Step back in time in the ancient city of Rome.</p>
                    <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* AI Guide Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">AI-Powered Destination Guides</h2>
              <p className="mb-6">
                Our intelligent travel assistant provides personalized recommendations, local insights, and up-to-date information for your next adventure.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">Try AI Guide</Button>
            </div>
            <div className="md:w-1/2 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                <div className="bg-white/20 p-4 rounded-lg">
                  <p className="font-medium">What are the best times to visit Kyoto for cherry blossoms?</p>
                </div>
                <div className="bg-white/30 p-4 rounded-lg">
                  <p>The best time to see cherry blossoms in Kyoto is typically from late March to early April. The exact timing varies each year depending on weather conditions. Popular viewing spots include Maruyama Park, Philosopher's Path, and Arashiyama.</p>
                </div>
                <Input placeholder="Ask about any destination..." className="bg-white/20 border-0 placeholder:text-white/70 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-600">
            Subscribe to our newsletter for travel tips, exclusive deals, and destination inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-grow" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
