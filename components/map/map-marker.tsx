'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from './map-context';

interface MapMarkerProps {
  lng: number;
  lat: number;
  children?: React.ReactNode;
  options?: mapboxgl.MarkerOptions;
  onClick?: () => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ lng, lat, children, options, onClick }) => {
  const { map } = useMap();
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;

    let el: HTMLElement | undefined;

    // If children are provided, render them as custom HTML inside the marker
    if (children && elementRef.current) {
      el = elementRef.current;
    }

    markerRef.current = new mapboxgl.Marker({ element: el, ...options })
      .setLngLat([lng, lat])
      .addTo(map);

    if (onClick && markerRef.current.getElement()) {
      markerRef.current.getElement().addEventListener('click', onClick);
    }

    return () => {
      if (onClick && markerRef.current?.getElement()) {
        markerRef.current.getElement().removeEventListener('click', onClick);
      }
      markerRef.current?.remove();
    };
  }, [map, lng, lat, children, options, onClick]);

  // If using custom children, we render them into a hidden div, which mapboxgl uses
  return children ? (
    <div style={{ display: 'none' }}>
      <div ref={elementRef}>{children}</div>
    </div>
  ) : null;
};
