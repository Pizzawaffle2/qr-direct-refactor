// src/app/bio-link/store/bioPageStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRESET_THEMES, DEFAULT_THEME } from '@/constants/bio-link/presetThemes';
import { BioPage, BioPageTheme, BioLink, TabType } from '../types';
import { saveBioPage, publishBioPage } from '../actions';

export interface LocalBioPageTheme {
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'medium';
}

interface LoadingState {
  isSaving: boolean;
  isPublishing: boolean;
  isLoading: boolean;
}

interface BioPageState {
  // Data
  bioPage: BioPage;
  activeTab: TabType;
  loadingState: LoadingState;
  error: string | null;

  // UI Actions
  setActiveTab: (tab: TabType) => void;
  setError: (error: string | null) => void;

  // Data Actions
  updateTheme: (theme: LocalBioPageTheme) => void;
  updateLinks: (links: BioLink[]) => void;
  updateProfile: (updates: Partial<Pick<BioPage, 'name' | 'bio' | 'profileImage'>>) => void;
  addLink: (link: Omit<BioLink, 'id' | 'clicks'>) => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, updates: Partial<BioLink>) => void;

  // API Actions
  savePage: () => Promise<void>;
  publishPage: () => Promise<void>;
  resetStore: () => void;
}

const initialState: Pick<BioPageState, 'bioPage' | 'activeTab' | 'loadingState' | 'error'> = {
  bioPage: {
    id: '',
    userId: '',
    slug: '',
    name: '',
    bio: '',
    theme: DEFAULT_THEME,
    links: [],
    analytics: {
      totalViews: 0,
      uniqueVisitors: 0,
      viewHistory: [],
      clicksByLink: [],
      locations: [],
      devices: []
    },
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  activeTab: 'edit',
  loadingState: {
    isSaving: false,
    isPublishing: false,
    isLoading: false
  },
  error: null
};

export const useBioPageStore = create<BioPageState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // UI Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setError: (error) => set({ error }),

      // Data Actions
      updateTheme: (theme: LocalBioPageTheme) =>
        set((state) => ({
          bioPage: {
            ...state.bioPage,
            theme: {
              ...state.bioPage.theme,
              ...theme
            },
            updatedAt: new Date()
          }
        })),

      updateLinks: (links) =>
        set((state) => ({
          bioPage: {
            ...state.bioPage,
            links,
            updatedAt: new Date()
          }
        })),

      updateProfile: (updates) =>
        set((state) => ({
          bioPage: {
            ...state.bioPage,
            ...updates,
            updatedAt: new Date()
          }
        })),

      addLink: (link) =>
        set((state) => ({
          bioPage: {
            ...state.bioPage,
            links: [
              ...state.bioPage.links,
              {
                ...link,
                id: crypto.randomUUID(),
                clicks: 0
              }
            ],
            updatedAt: new Date()
          }
        })),

      removeLink: (id) =>
        set((state) => ({
          bioPage: {
            ...state.bioPage,
            links: state.bioPage.links.filter((link) => link.id !== id),
            updatedAt: new Date()
          }
        })),

      updateLink: (id, updates) =>
        set((state) => ({
          bioPage: {
            ...state.bioPage,
            links: state.bioPage.links.map((link) =>
              link.id === id ? { ...link, ...updates } : link
            ),
            updatedAt: new Date()
          }
        })),

      // API Actions
      savePage: async () => {
        const state = get();
        set((state) => ({
          loadingState: { ...state.loadingState, isSaving: true },
          error: null
        }));

        try {
          await saveBioPage(state.bioPage);
          set((state) => ({
            loadingState: { ...state.loadingState, isSaving: false }
          }));
        } catch (error) {
          set((state) => ({
            loadingState: { ...state.loadingState, isSaving: false },
            error: error instanceof Error ? error.message : 'Failed to save page'
          }));
        }
      },

      publishPage: async () => {
        const state = get();
        if (!state.bioPage.id) {
          set({ error: 'Cannot publish unsaved page' });
          return;
        }

        set((state) => ({
          loadingState: { ...state.loadingState, isPublishing: true },
          error: null
        }));

        try {
          await publishBioPage(state.bioPage.id);
          set((state) => ({
            bioPage: { ...state.bioPage, isPublished: true },
            loadingState: { ...state.loadingState, isPublishing: false }
          }));
        } catch (error) {
          set((state) => ({
            loadingState: { ...state.loadingState, isPublishing: false },
            error: error instanceof Error ? error.message : 'Failed to publish page'
          }));
        }
      },

      resetStore: () => {
        set(initialState);
      }
    }),
    {
      name: 'bio-page-store',
      partialize: (state) => ({
        bioPage: state.bioPage,
        activeTab: state.activeTab
      })
    }
  )
);

// Custom hooks for accessing specific parts of the store
export const useBioPageTheme = () => useBioPageStore((state) => state.bioPage.theme);
export const useBioPageLinks = () => useBioPageStore((state) => state.bioPage.links);
export const useBioPageLoadingState = () => useBioPageStore((state) => state.loadingState);
export const useBioPageError = () => useBioPageStore((state) => state.error);

// Helper hook for analytics
export const useBioPageAnalytics = () => {
  const analytics = useBioPageStore((state) => state.bioPage.analytics);
  const links = useBioPageStore((state) => state.bioPage.links);

  return {
    ...analytics,
    linkPerformance: links.map(link => ({
      linkId: link.id,
      title: link.title,
      clicks: analytics.clicksByLink.find(c => c.linkId === link.id)?.clicks || 0,
      percentage: (analytics.clicksByLink.find(c => c.linkId === link.id)?.clicks || 0) / 
                 (analytics.clicksByLink.reduce((acc, curr) => acc + curr.clicks, 0) || 1) * 100
    }))
  };
};