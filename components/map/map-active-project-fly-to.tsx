'use client';

import React, { useEffect } from 'react';
import { useMap } from './map-context';
import type { CountryProject } from '../interactive-map';

export interface MapActiveProjectFlyToProps {
  selectedCountryName?: string;
  activeProjects: CountryProject[];
  selectedProjectIndex: number | null;
  cityCoordinates: Record<string, [number, number]>;
}

export const MapActiveProjectFlyTo: React.FC<MapActiveProjectFlyToProps> = ({
  selectedCountryName,
  activeProjects,
  selectedProjectIndex,
  cityCoordinates
}) => {
  const { map } = useMap();

  useEffect(() => {
    if (map && selectedCountryName && activeProjects.length > 0 && selectedProjectIndex !== null && selectedProjectIndex !== -1) {
      const activeProject = activeProjects[selectedProjectIndex];
      if (activeProject) {
        const cityKey = activeProject.location.split(' / ')[0];
        const coords = cityCoordinates[cityKey];
        
        if (coords) {
          const smoothEasing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
          const padding = isMobile
            ? { top: 0, bottom: 0, left: 0, right: 0 }
            : { top: 0, bottom: 0, left: 0, right: 380 };

          // Add right padding of 380px to push target marker to the left of the 420px sidebar dossier
          map.flyTo({
            center: [coords[0], coords[1]],
            zoom: Math.max(map.getZoom(), 6.5),
            padding,
            duration: 1000,
            easing: smoothEasing,
            essential: true
          });
        }
      }
    }
  }, [map, selectedProjectIndex, activeProjects, cityCoordinates, selectedCountryName]);

  return null;
};