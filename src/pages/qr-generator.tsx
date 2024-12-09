"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import QRCode with no SSR
const QRCode = dynamic(
  () => import('react-qrcode-logo').then(mod => ({ default: mod.QRCode })),
  { ssr: false }
);

export default function QRGeneratorPage() {
  const [content, setContent] = useState("");
  const [destination, setDestination] = useState("");
  const [color, setColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [logo, setLogo] = useState(null);
  const [qrCodeSlug, setQrCodeSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/qr-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        destination,
        color,
        background,
        logo: logoUrl,
        userId: 1,
      }),
    });

    const data = await res.json();
    setQrCodeSlug(data.qrCode.slug);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-6">
            QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Create and customize dynamic QR codes for your projects.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <input
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter text or URL"
                className="mt-2 w-full p-3 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Destination URL
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination URL"
                className="mt-2 w-full p-3 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Foreground Color
                </label>
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="mt-2 w-full h-10 p-1 border border-gray-300 rounded dark:border-gray-700"
                />
              </div>
              <div>
                <label htmlFor="background" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Color
                </label>
                <input
                  type="color"
                  id="background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="mt-2 w-full h-10 p-1 border border-gray-300 rounded dark:border-gray-700"
                />
              </div>
            </div>

            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Logo (Optional)
              </label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoChange}
                className="mt-2 w-full border border-gray-300 rounded p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Generate QR Code
            </button>
          </div>

          {qrCodeSlug && (
            <div className="mt-8 text-center">
              {typeof window !== 'undefined' && (
                <QRCode
                  value={`${window.location.origin}/s/${qrCodeSlug}`}
                  fgColor={color}
                  bgColor={background}
                  logoImage={logoUrl}
                />
              )}
              <p className="text-blue-500 mt-4">
                <a href={`/s/${qrCodeSlug}`} target="_blank" rel="noopener noreferrer">
                  {typeof window !== 'undefined' && `${window.location.origin}/s/${qrCodeSlug}`}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}