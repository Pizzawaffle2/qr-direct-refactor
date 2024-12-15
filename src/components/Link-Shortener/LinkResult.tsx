// src/app/link-shortener/components/LinkResult.tsx
import { useState } from 'react';
import { Copy, Check, ExternalLink, Link2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface LinkResultProps {
  shortenedUrl: string;
  originalUrl: string;
  fullUrl: string;
}

export function LinkResult({ shortenedUrl, originalUrl, fullUrl }: LinkResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
          <Check className="w-4 h-4" />
          Your shortened link is ready!
        </div>

        <div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                value={fullUrl}
                className="w-full px-4 py-3 pr-24 border rounded-md bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                placeholder="Shortened URL"
                title="Shortened URL"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-1.5 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              title="Open link in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-md bg-gray-50 dark:bg-gray-800">
          <div className="flex items-start gap-2">
            <Link2 className="w-4 h-4 mt-1 text-gray-400" />
            <div className="flex-1">
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Original URL:
              </span>
              <a 
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-600 hover:underline break-all transition-colors"
              >
                {originalUrl}
              </a>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Share this shortened link with anyone who needs access to your original URL.
        </div>
      </div>
    </div>
  );
}