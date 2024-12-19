// src/components/team/TableSkeleton.tsx
export function TableSkeleton() {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-100 mb-4" /> {/* Header */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        ))}
      </div>
    );
  }