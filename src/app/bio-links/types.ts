// src/app/bio-link/types.ts
export interface BioLink {
    id: string;
    title: string;
    url: string;
    icon?: string;
    backgroundColor?: string;
    textColor?: string;
    animation?: 'fade' | 'slide' | 'bounce' | 'none';
    clicks: number;
    lastClicked?: Date;
  }
  
  export interface BioPageTheme {
    name: string;
    backgroundColor: string;
    fontFamily: string;
    buttonStyle: string;
    buttonAnimation: string;
    colorScheme: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
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
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
      linkedin?: string;
      github?: string;
    };
    analytics: {
      totalViews: number;
      uniqueVisitors: number;
      lastVisited?: Date;
    };
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  }