'use client';

import React, { useState } from 'react';
import { MapProvider } from './map-context';
import { MapControls } from './map-controls';
import { MapMarker } from './map-marker';
import { MapPopup } from './map-popup';
import { MapHighlightedCountries } from './map-highlighted-countries';
import { MapAutoCenter } from './map-auto-center';
import { MapActiveProjectFlyTo } from './map-active-project-fly-to';
import { Building, Store, Coffee, Car, AlertCircle, MapPin, Navigation, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { CountryProject } from './map-types';

interface SelectedLocation {
  lng: number;
  lat: number;
  name: string;
  address?: string;
  categories?: string[];
  operationalStatus?: string;
}

const getCategoryIcon = (categories?: string[]) => {
  if (!categories || categories.length === 0) return <MapPin className="w-5 h-5 text-primary" />;
  const cat = categories[0].toLowerCase();
  if (cat.includes('food') || cat.includes('restaurant') || cat.includes('cafe')) return <Coffee className="w-5 h-5 text-orange-500" />;
  if (cat.includes('store') || cat.includes('shop')) return <Store className="w-5 h-5 text-blue-500" />;
  if (cat.includes('car') || cat.includes('auto') || cat.includes('gas')) return <Car className="w-5 h-5 text-red-500" />;
  if (cat.includes('office') || cat.includes('business')) return <Building className="w-5 h-5 text-purple-500" />;
  return <MapPin className="w-5 h-5 text-primary" />;
};

interface InteractiveMapboxProps {
  onCountryClick?: (countryName: string | null) => void;
  setHoveredName?: (name: string | null) => void;
  setTooltipPos?: (pos: { x: number; y: number }) => void;
  selectedCountryName?: string;
  activeProjects?: CountryProject[];
  selectedProjectIndex?: number | null;
  setSelectedProjectIndex?: (index: number | null) => void;
  cityCoordinates?: Record<string, [number, number]>;
  onMapReady?: (map: any) => void;
}

export const InteractiveMapbox: React.FC<InteractiveMapboxProps> = ({
  onCountryClick,
  setHoveredName,
  setTooltipPos,
  selectedCountryName,
  activeProjects = [],
  selectedProjectIndex = null,
  setSelectedProjectIndex,
  cityCoordinates = {},
  onMapReady
}) => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  const handleDirections = () => {
    if (selectedLocation) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`, '_blank');
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapProvider onMapReady={onMapReady}>
        <MapAutoCenter selectedCountryName={selectedCountryName} />
        <MapActiveProjectFlyTo
          selectedCountryName={selectedCountryName}
          activeProjects={activeProjects}
          selectedProjectIndex={selectedProjectIndex}
          cityCoordinates={cityCoordinates}
        />
        <MapControls />
        
        <MapHighlightedCountries 
          onCountryClick={onCountryClick}
          setHoveredName={setHoveredName}
          setTooltipPos={setTooltipPos}
          selectedCountryName={selectedCountryName}
        />

        {/* Global Search Location Marker */}
        {selectedLocation && (
          <>
            <MapMarker lng={selectedLocation.lng} lat={selectedLocation.lat}>
              <div className="bg-background rounded-full p-2 shadow-lg border border-border animate-bounce">
                {getCategoryIcon(selectedLocation.categories)}
              </div>
            </MapMarker>

            <MapPopup 
              lng={selectedLocation.lng} 
              lat={selectedLocation.lat} 
              options={{ offset: 25, closeButton: false, maxWidth: '320px' }}
            >
              <div className="flex flex-col gap-3 p-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-base leading-tight">{selectedLocation.name}</h3>
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-muted-foreground hover:text-foreground shrink-0"
                  >
                    ✕
                  </button>
                </div>
                
                {selectedLocation.address && (
                  <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedLocation.categories?.slice(0, 3).map(cat => (
                    <Badge key={cat} variant="secondary" className="text-[10px] flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {cat}
                    </Badge>
                  ))}
                </div>

                {selectedLocation.operationalStatus && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className={`w-4 h-4 ${selectedLocation.operationalStatus.toLowerCase() === 'open' ? 'text-green-500' : 'text-yellow-500'}`} />
                    <span className="capitalize">{selectedLocation.operationalStatus}</span>
                  </div>
                )}

                <Button className="w-full mt-2" size="sm" onClick={handleDirections}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
            </MapPopup>
          </>
        )}
      </MapProvider>
    </div>
  );
};
