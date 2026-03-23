import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types/offer';

type MapProps = {
  offers: Offer[];
  selectedOfferId: string | null;
  className?: string;
};

const DEFAULT_COORDS: [number, number] = [52.3909553943508, 4.85309666406198];
const DEFAULT_ZOOM = 12;

const defaultIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({offers, selectedOfferId, className = 'cities__map map'}: MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<leaflet.Map | null>(null);
  const markersLayerRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (mapContainerRef.current === null || mapRef.current !== null) {
      return;
    }

    const map = leaflet.map(mapContainerRef.current).setView(DEFAULT_COORDS, DEFAULT_ZOOM);

    leaflet
      .tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        })
      .addTo(map);

    mapRef.current = map;
    markersLayerRef.current = leaflet.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);


  useEffect(() => {
    const markersLayer = markersLayerRef.current;
    if (markersLayer === null) {
      return;
    }

    markersLayer.clearLayers();

    offers.forEach((offer) => {
      const isActive = selectedOfferId === offer.id;

      leaflet
        .marker([offer.location.lat, offer.location.lng], {
          icon: isActive ? activeIcon : defaultIcon,
        })
        .addTo(markersLayer);
    });
  }, [offers, selectedOfferId]);

  return <div className={className} ref={mapContainerRef} />;
}

export default Map;
