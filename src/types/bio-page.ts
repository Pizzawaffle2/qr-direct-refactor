// src/types/bio-page.ts
export type AnimationType = 'none' | 'slide' | 'bounce' | 'fade' | 'scale' | 'shine';
export type ButtonStyle = 'rounded' | 'sharp' | 'pill';
export type FontSize = 'small' | 'medium' | 'large';
export type TextAlign = 'left' | 'center' | 'right';
export type FontWeight = 'normal' | 'medium';

export interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
  background: string;
}

export interface BioPageTheme {
  name: string;
  backgroundColor: string;
  buttonStyle: string;
  buttonAnimation: string;
  colorScheme: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fontFamily: string;
  fontSize: 'medium' | 'small' | 'large';
  textAlign: string;
  fontWeight: string;
  backgroundPattern?: 'none' | 'dots' | 'lines' | 'grid';
}

export interface BioPageLink {
  id: string;
  title: string;
  url: string;
  animation?: AnimationType;
  backgroundColor?: string;
  textColor?: string;
  clicks: number;
  lastClicked?: Date;
}

export interface BioPageAnalytics {
  totalViews: number;
  uniqueVisitors: number;
  lastVisited?: Date;
  viewHistory: Array<{ date: string; views: number }>;
  clicksByLink: Array<{ linkId: string; clicks: number }>;
  locations: Array<{ country: string; count: number }>;
  devices: Array<{ type: string; count: number }>;
}

export interface BioPage {
  id: string;
  userId: number;
  name: string;
  bio?: string;
  theme: BioPageTheme;
  links: BioPageLink[];
  isPublished: boolean;
  views: number;
  slug: string;
  analytics?: BioPageAnalytics;
  createdAt: Date;
  updatedAt: Date;
}