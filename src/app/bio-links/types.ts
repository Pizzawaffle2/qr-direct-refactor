// src/app/bio-link/types.ts
export type AnimationType = 'none' | 'slide' | 'bounce' | 'fade' | 'scale' | 'shine';
export type ButtonStyle = 'rounded' | 'sharp' | 'pill';
export type TimeFrame = '7d' | '30d' | '90d';
export type TabType = 'edit' | 'theme' | 'preview';
export type ColorSchemeKey = 'primary' | 'secondary' | 'text' | 'background';

export interface BioLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  animation?: AnimationType;
  clicks: number;
  lastClicked?: Date;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
  background: string;
}

export interface BioPageTheme {
  name: string;
  backgroundColor: string;
  fontFamily: string;
  buttonStyle: ButtonStyle;
  buttonAnimation: AnimationType;
  colorScheme: ColorScheme;
  backgroundPattern?: 'none' | 'dots' | 'lines' | 'grid';
  fontSize?: string;
  textAlign?: string;
  fontWeight?: string;
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

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
}

export interface BioPage {
  id: string;
  userId: string;
  slug: string;
  profileImage?: string;
  name: string;
  bio: string;
  theme: BioPageTheme;
  links: BioLink[];
  socialLinks?: SocialLinks;
  analytics: BioPageAnalytics;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}