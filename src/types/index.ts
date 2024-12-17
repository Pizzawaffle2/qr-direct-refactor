// src/types/index.ts
export interface User {
    id: number;
    email: string;
    name?: string | null;
    picture?: string | null;
  }
  
  export interface AnalyticsEvent {
    bioPageId: string;
    event: string;
    data?: Record<string, any>;
    timestamp: Date;
  }