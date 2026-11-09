'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { useMap } from './map-context';

interface MapPopupProps {
  lng: number;
  lat: number;
  children: React.ReactNode;
  options?: mapboxgl.PopupOptions;
  onClose?: () => void;
}

export const MapPopup: React.FC<MapPopupProps> = ({ lng, lat, children, options, onClose }) => {
  const { map } = useMap();
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;
    
    const div = document.createElement('div');
    setContainer(div);

    popupRef.current = new mapboxgl.Popup(options)
      .setLngLat([lng, lat])
      .setDOMContent(div)
      .addTo(map);

    if (onClose) {
      popupRef.current.on('close', onClose);
    }

    return () => {
      if (onClose && popupRef.current) {
        popupRef.current.off('close', onClose);
      }
      popupRef.current?.remove();
    };
  }, [map, lng, lat, options, onClose]);

  if (!container) return null;

  return createPortal(children, container);
};
