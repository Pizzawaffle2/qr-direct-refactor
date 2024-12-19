// src\app\layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Layout from '@/components/UI/Layout'

export const metadata: Metadata = {
  title: 'QR Direct',
  description: 'Dynamic QR Code Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
      </body>
    </html>
  );
}