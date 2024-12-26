// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ThemeProvider } from '@/components/Theme/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '@/components/ErrorBoundary'
import Layout from '@/components/UI/Layout'
// import { generateViewport } from 'next'

export const metadata: Metadata = {
  title: 'QR Direct',
  description: 'Generate, customize, and track dynamic QR codes for your business and events',
  keywords: 'QR code, QR generator, dynamic QR codes, QR tracking, QR analytics',
  authors: [{ name: 'QR Direct Team' }],
  openGraph: {
    title: 'QR Direct - Dynamic QR Code Generator',
    description: 'Create customizable QR codes for your business and events',
    url: 'https://qr-direct.com',
    siteName: 'QR Direct',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QR Direct Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Direct - Dynamic QR Code Generator',
    description: 'Create customizable QR codes for your business and events',
    images: ['/twitter-image.png'],
    creator: '@qrdirect',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <UserProvider>
              <Layout>
                {children}
              </Layout>
              <Toaster position="top-right" />
              <Analytics />
            </UserProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}