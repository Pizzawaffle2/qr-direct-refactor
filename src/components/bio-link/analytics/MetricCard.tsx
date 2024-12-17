// src/app/bio-link/components/analytics/MetricCard.tsx
import { ReactNode } from 'react';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricCard({ icon, label, value, trend }: MetricCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-blue-500">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}