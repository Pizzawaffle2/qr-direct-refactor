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
  other: {
    'application-name': 'QR Direct',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'QR Direct',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#2B5797',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#ffffff'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' }
  ],
  minimumScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Critical CSS */}
        <link 
          rel="preload" 
          href="/styles/critical.css" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "QR Direct",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />

        {/* Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com;"
        />
      </head>
      
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip Navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        
        <Providers>
          <Layout>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}