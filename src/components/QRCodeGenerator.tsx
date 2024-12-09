"use client";

import { useState } from "react";
import { QRCode } from "react-qrcode-logo";

const QRCodeGenerator = () => {
  const [destination, setDestination] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logo, setLogo] = useState<File | null>(null);
  const [predefinedLogo, setPredefinedLogo] = useState<keyof typeof predefinedLogos | "">("");

  const handleGenerate = async () => {
    const res = await fetch("/api/short-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination }),
    });

    const data = await res.json();
    setShortUrl(`${window.location.origin}/s/${data.shortLink.slug}`);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
      setPredefinedLogo(""); // Clear predefined logo when a custom logo is uploaded
    }
  };

  const predefinedLogos = {
    facebook: "/logos/facebook.png",
    reddit: "/logos/reddit.png",
    x: "/logos/x.png",
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Enhanced QR Code Generator</h1>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Enter destination URL"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="flex gap-4 mb-4">
        <label>
          Foreground Color:
          <input
            type="color"
            value={foregroundColor}
            onChange={(e) => setForegroundColor(e.target.value)}
            className="ml-2"
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="ml-2"
          />
        </label>
      </div>
      <div className="flex gap-4 mb-4">
        <label>
          Upload Logo:
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="mb-4"
            title="Upload Logo"
          />
        </label>
        <label htmlFor="predefinedLogo" className="sr-only">Predefined Logo</label>
        <select
          id="predefinedLogo"
          value={predefinedLogo}
          onChange={(e) => {
            setPredefinedLogo(e.target.value as keyof typeof predefinedLogos | "");
            setLogo(null); // Clear custom logo when a predefined logo is selected
          }}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select Predefined Logo</option>
          <option value="facebook">Facebook</option>
          <option value="reddit">Reddit</option>
          <option value="x">X</option>
        </select>
      </div>
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Short URL
      </button>
      {shortUrl && (
        <div className="flex flex-col items-center">
          <QRCode
            value={shortUrl}
            fgColor={foregroundColor}
            bgColor={backgroundColor}
            logoImage={
              logo ? URL.createObjectURL(logo) : (predefinedLogo ? predefinedLogos[predefinedLogo] : undefined)
            }
            logoWidth={50}
            logoHeight={50}
            eyeRadius={5} // Example customization for QR code eyes
          />
          <p className="mt-4 text-blue-500">{shortUrl}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
