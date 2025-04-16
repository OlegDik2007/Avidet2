import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'AvideTravel - Your Ultimate Travel Companion',
  description: 'Book flights, hotels, tour packages, and car rentals with AvideTravel. Explore destinations with AI-powered guides.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <div className="mr-4 flex">
              <a href="/" className="flex items-center space-x-2">
                <span className="font-bold text-2xl">AvideTravel</span>
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
              <a href="/" className="transition-colors hover:text-foreground/80">Home</a>
              <a href="/booking" className="transition-colors hover:text-foreground/80">Book Travel</a>
              <a href="/destinations" className="transition-colors hover:text-foreground/80">Destinations</a>
              <a href="/contact" className="transition-colors hover:text-foreground/80">Contact</a>
            </nav>
            <div className="flex items-center justify-end space-x-4">
              <a href="/contact" className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Contact Us
              </a>
              <button className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-6 md:py-10">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} AvideTravel. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</a>
              <a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy</a>
              <a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms</a>
              <a href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
