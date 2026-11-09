'use client';

import React from 'react';
import { useMap } from './map-context';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export const MapControls: React.FC = () => {
  const { map } = useMap();

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  return (
    <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10">
      <Button variant="secondary" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
        <Plus className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
};
