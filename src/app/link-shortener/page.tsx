// src/app/link-shortener/page.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LinkForm } from '@/components/Link-Shortener/LinkForm';
import { LinkResult } from '@/components/Link-Shortener/LinkResult';
import { ShortenedLink, LinkFormData } from './types';

export default function LinkShortenerPage() {
  const [shortenedLink, setShortenedLink] = useState<ShortenedLink | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShortenLink = async (formData: LinkFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate URL
      if (!formData.url.startsWith('http://') && !formData.url.startsWith('https://')) {
        throw new Error('Please enter a valid URL starting with http:// or https://');
      }

      // Validate alias if provided
      if (formData.alias && !/^[a-zA-Z0-9-]+$/.test(formData.alias)) {
        throw new Error('Alias can only contain letters, numbers, and hyphens');
      }

      const response = await fetch('/api/shorten-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formData.url,
          alias: formData.alias || undefined,
          expiresIn: formData.expiresIn,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to shorten link');
      }

      setShortenedLink({
        shortenedUrl: data.shortenedUrl,
        originalUrl: data.originalUrl,
        fullUrl: data.fullUrl,
        expiresAt: data.expiresAt,
        isPasswordProtected: !!data.password
      });

      toast.success('Link shortened successfully!');

      // Track analytics
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'link_created',
            linkId: data.shortenedUrl
          })
        });
      } catch (analyticsError) {
        console.error('Analytics error:', analyticsError);
      }

    } catch (error: any) {
      console.error('Error shortening link:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
            Link Shortener
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Create shortened links with optional custom aliases, expiration dates, and password protection.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <LinkForm
              onSubmit={handleShortenLink}
              isLoading={isLoading}
            />

            {shortenedLink && (
              <LinkResult
                shortenedUrl={shortenedLink.shortenedUrl}
                originalUrl={shortenedLink.originalUrl}
                fullUrl={shortenedLink.fullUrl}
                expiresAt={shortenedLink.expiresAt}
                isPasswordProtected={shortenedLink.isPasswordProtected}
              />
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Custom Aliases"
              description="Create memorable, branded short links with custom aliases."
            />
            <FeatureCard 
              title="Password Protection"
              description="Secure your links with optional password protection."
            />
            <FeatureCard 
              title="Link Expiration"
              description="Set expiration dates for temporary links."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}