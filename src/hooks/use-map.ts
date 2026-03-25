import {MutableRefObject, useEffect, useState} from 'react';
import {Map as LeafletMap, TileLayer} from 'leaflet';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  center: [number, number],
  zoom: number
): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    const instance = new LeafletMap(mapRef.current, {
      center,
      zoom,
    });

    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    instance.addLayer(layer);
    setMap(instance);

    return () => {
      instance.remove();
      setMap(null);
    };
  }, [mapRef, center, zoom]);

  return map;
}

export default useMap;
