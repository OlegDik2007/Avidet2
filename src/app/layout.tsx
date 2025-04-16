import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Use Inter font from Google Fonts instead of Geist
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AvideTravel - Your Travel Agency',
  description: 'Book flights, hotels, tours and car rentals with AvideTravel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
