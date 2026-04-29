'use client';
import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import CompareBar from '@/components/college/CompareBar';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000, retry: 1 } },
  }));

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <title>EduRank – Discover the Best Colleges in India</title>
        <meta name="description" content="Search, compare and explore top colleges in India. Filter by fees, location, ratings, placements and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 64px)', paddingBottom: '80px' }}>
              {children}
            </main>
            <CompareBar />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
