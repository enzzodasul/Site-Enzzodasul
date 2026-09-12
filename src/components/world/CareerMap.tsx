import React, { useState, useEffect } from 'react';
import { Location } from '../../types';

interface CareerMapProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}

export const CareerMap: React.FC<CareerMapProps> = ({
  locations,
  onSelectLocation,
}) => {
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);
  const [leafletL, setLeafletL] = useState<any>(null);
  const [mapError, setMapError] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;

    // Dynamically import Leaflet safely on client side
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ])
      .then(([leafletModule, reactLeafletModule]) => {
        if (!isSubscribed) return;

        const L = leafletModule.default || leafletModule;
        
        // Safely set Leaflet Icon defaults
        if (L && L.Icon && L.Icon.Default && L.Icon.Default.prototype) {
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        }

        setLeafletL(L);
        setLeafletComponents(reactLeafletModule);
      })
      .catch((err) => {
        console.error('Failed to load Leaflet:', err);
        if (isSubscribed) setMapError(true);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const centerLat = -26.5;
  const centerLng = -50.5;

  if (mapError || !LeafletComponents || !leafletL) {
    return (
      <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl bg-surface border border-surface-border flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mb-3">
          📍
        </div>
        <h4 className="text-lg font-display font-bold text-text">Mapa Interativo de Carreira</h4>
        <p className="text-xs font-mono text-text-muted mt-1 max-w-md">
          {mapError ? 'Carregando versão simplificada...' : 'Carregando mapa...'}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc)}
              className="px-3 py-1.5 bg-surface-hover border border-surface-border hover:border-accent text-xs font-mono text-text rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>📍 {loc.city} ({loc.country})</span>
              <span className="text-accent font-bold">[{loc.showsCount} shows]</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = LeafletComponents;

  const createCustomIcon = (showsCount: number) => {
    return leafletL.divIcon({
      className: 'custom-map-pin-wrapper',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute w-8 h-8 rounded-full bg-accent/40 animate-ping"></span>
          <div class="relative w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center font-mono font-bold text-xs shadow-glow border-2 border-white">
            ${showsCount}
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden border border-surface-border shadow-2xl">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={4}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={createCustomIcon(loc.showsCount)}
            eventHandlers={{
              click: () => onSelectLocation(loc),
            }}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-2 flex flex-col gap-2 text-left bg-surface text-text rounded-lg border border-surface-border">
                <span className="font-display font-bold text-sm text-text">
                  {loc.city}, {loc.country}
                </span>
                <span className="text-xs font-mono text-accent">
                  {loc.showsCount} {loc.showsCount === 1 ? 'Apresentação' : 'Apresentações'}
                </span>
                <button
                  onClick={() => onSelectLocation(loc)}
                  className="mt-1 px-3 py-1 bg-accent text-white font-mono text-[10px] uppercase tracking-wider rounded font-bold hover:bg-accent-hover"
                >
                  Ver Histórico
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
