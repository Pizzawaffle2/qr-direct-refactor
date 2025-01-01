// src/components/calendar/frame-patterns.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';

interface FramePatternsProps {
  onFrameSelect: (frame: FramePattern) => void;
}

interface FramePattern {
  id: string;
  name: string;
  preview: string;
  category: 'decorative' | 'seasonal';
}

const FRAME_PATTERNS: FramePattern[] = [
  {
    id: 'classic',
    name: 'Classic',
    preview: '/images/frames/classic.png',
    category: 'decorative',
  },
  {
    id: 'floral',
    name: 'Floral',
    preview: '/images/frames/floral.png',
    category: 'decorative',
  },
  {
    id: 'snowflakes',
    name: 'Snowflakes',
    preview: '/images/frames/snowflakes.png',
    category: 'seasonal',
  },
  {
    id: 'autumn-leaves',
    name: 'Autumn Leaves',
    preview: '/images/frames/autumn-leaves.png',
    category: 'seasonal',
  },
];

const FramePatterns: React.FC<FramePatternsProps> = ({ onFrameSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'decorative' | 'seasonal'>('all');

  const filteredFrames = FRAME_PATTERNS.filter(
    (frame) => selectedCategory === 'all' || frame.category === selectedCategory
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Frame Patterns</h3>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === 'decorative' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('decorative')}
        >
          Decorative
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === 'seasonal' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('seasonal')}
        >
          Seasonal
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredFrames.map((frame) => (
          <Card
            key={frame.id}
            className="p-4 flex flex-col items-center cursor-pointer hover:shadow-lg"
            onClick={() => onFrameSelect(frame)}
          >
            <img
              src={frame.preview}
              alt={frame.name}
              className="h-24 w-24 object-contain"
            />
            <p className="mt-2 text-sm font-medium">{frame.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FramePatterns;
