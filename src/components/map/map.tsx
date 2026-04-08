import {useEffect, useRef} from 'react';
import {LayerGroup, icon, layerGroup, marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {OfferPreview} from '../../types/offer';
import useMap from '../../hooks/use-map';

type MapProps = {
  offers: OfferPreview[];
  selectedOfferId: string | null;
};

const DEFAULT_COORDS: [number, number] = [52.3909553943508, 4.85309666406198];
const DEFAULT_ZOOM = 12;

const defaultIcon = icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({offers, selectedOfferId}: MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const map = useMap(mapContainerRef, DEFAULT_COORDS, DEFAULT_ZOOM);

  useEffect(() => {
    if (map === null || offers.length === 0) {
      return;
    }

    map.setView([offers[0].location.lat, offers[0].location.lng], DEFAULT_ZOOM);
  }, [map, offers]);

  useEffect(() => {
    if (map === null) {
      return;
    }

    if (markersLayerRef.current === null) {
      markersLayerRef.current = layerGroup().addTo(map);
    }

    const markersLayer = markersLayerRef.current;

    markersLayer.clearLayers();

    offers.forEach((offer) => {
      const currentIcon = offer.id === selectedOfferId ? activeIcon : defaultIcon;

      marker([offer.location.lat, offer.location.lng], {
        icon: currentIcon,
      }).addTo(markersLayer);
    });
  }, [map, offers, selectedOfferId]);

  return <div ref={mapContainerRef} style={{height: '100%'}} />;
}

export default Map;
