import './globals.css'
import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}