// components/StatsProvider.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface Stats {
  totalGenerated: number;
  favoriteColors: string[];
  mostUsedStyle: string;
  averageSize: number;
}

const StatsContext = createContext<{
  stats: Stats;
  updateStats: (options: any) => void;
}>({
  stats: {
    totalGenerated: 0,
    favoriteColors: [],
    mostUsedStyle: '',
    averageSize: 0,
  },
  updateStats: () => {},
});

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<Stats>({
    totalGenerated: 0,
    favoriteColors: [],
    mostUsedStyle: '',
    averageSize: 0,
  });

  // Persist stats to localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('qr-generator-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const updateStats = (options: any) => {
    setStats(prev => {
      const updated = {
        ...prev,
        totalGenerated: prev.totalGenerated + 1,
        favoriteColors: [...prev.favoriteColors, options.foregroundColor].slice(-5),
        mostUsedStyle: options.style,
        averageSize: (prev.averageSize * prev.totalGenerated + options.size) / (prev.totalGenerated + 1),
      };
      localStorage.setItem('qr-generator-stats', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);