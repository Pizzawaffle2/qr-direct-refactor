// src/app/bio-link/components/SharePanel.tsx
'use client';

import { useState } from 'react';
import { 
  Copy, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  QrCode 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SharePanelProps {
  bioPageUrl: string;
  title: string;
}

export function SharePanel({ bioPageUrl, title }: SharePanelProps) {
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bioPageUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareToSocial = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(bioPageUrl)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bioPageUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(bioPageUrl)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="font-medium mb-4">Share Your Bio Link</h3>
      
      {/* Copy Link */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={bioPageUrl}
          readOnly
          className="flex-1 px-3 py-2 border rounded-l"
          placeholder="Bio Page URL"
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
          title="Copy link to clipboard"
        >
          <Copy className="w-5 h-5" />
          <span className="sr-only">Copy link to clipboard</span>
        </button>
      </div>

      {/* Social Sharing */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => shareToSocial('twitter')}
          className="p-2 flex items-center justify-center gap-2 bg-[#1DA1F2] text-white rounded hover:opacity-90"
        >
          <Twitter className="w-5 h-5" />
          Twitter
        </button>
        {/* Add Facebook and LinkedIn buttons */}
      </div>

      {/* QR Code */}
      <button
        onClick={() => setShowQR(!showQR)}
        className="w-full px-4 py-2 border rounded hover:bg-gray-50 flex items-center justify-center gap-2"
      >
        <QrCode className="w-5 h-5" />
        Show QR Code
      </button>

      {showQR && (
        <div className="mt-4 p-4 border rounded">
          {/* QR Code component goes here */}
        </div>
      )}
    </div>
  );
}