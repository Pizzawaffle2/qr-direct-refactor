import './globals.css';
import type { Metadata } from 'next';
import Layout from '@/components/UI/Layout';
import Providers from '@/components/providers/Providers';

export const metadata: Metadata = {
  title: 'QR Direct',
  description: 'Generate, customize, and track dynamic QR codes for your business and events.',
  keywords: 'QR code, QR generator, dynamic QR codes, QR tracking, QR analytics',
  authors: [{ name: 'QR Direct Team' }],
  openGraph: {
    title: 'QR Direct - Dynamic QR Code Generator',
    description: 'Create customizable QR codes for your business and events.',
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
    description: 'Create customizable QR codes for your business and events.',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}