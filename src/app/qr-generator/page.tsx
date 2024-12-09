"use client";

import { useState } from "react";
import { QRCode } from "react-qrcode-logo";

export default function QRGeneratorPage() {
  const [content, setContent] = useState("");
  const [destination, setDestination] = useState("");
  const [color, setColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [logo, setLogo] = useState<File | null>(null);

  const handleGenerate = () => {
    // QR code generation logic
  };

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Generate Your QR Code
        </h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter text or URL"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination URL
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination URL"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Foreground Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 w-full"
                title="Foreground Color"
                placeholder="Select foreground color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Logo (Optional)
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={(e) => e.target.files && setLogo(e.target.files[0])}
              className="mt-1 w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Generate QR Code
          </button>
        </form>
        <div className="mt-8 text-center">
          <QRCode value={content} fgColor={color} bgColor={background} logoImage={logo && URL.createObjectURL(logo)} />
        </div>
      </div>
    </div>
  );
}
