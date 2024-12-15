// src/app/link-shortener/types.ts
export interface ShortenedLink {
    shortenedUrl: string;
    originalUrl: string;
    fullUrl: string;
    isPasswordProtected?: boolean;
    expiresAt?: string;
  }
  
  export interface LinkFormData {
    url: string;
    alias: string;
    password?: string;
    expiresIn?: '24h' | '7d' | '30d' | 'never';
  }

export interface LinkResultProps {

  shortenedUrl: string;

  originalUrl: string;

  fullUrl: string;

  expiresAt?: string;

  isPasswordProtected?: boolean;

}