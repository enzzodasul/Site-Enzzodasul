import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { CareerMap } from './CareerMap';
import { CareerStats } from './CareerStats';
import { CityDetailModal } from './CityDetailModal';
import { Location } from '../../types';
import { locationsService } from '../../services/locationsService';
import { mockCareerStats } from '../../data/mockData';

export const WorldSection: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    locationsService.getPlayedLocations().then(setLocations);
  }, []);

  return (
    <section id="world" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="MAPA DA CARREIRA"
          title="WHERE I'VE PLAYED"
          subtitle="Explore as cidades e países onde a música de Enzzo da Sul já ressoou ao vivo."
        />

        <div className="flex flex-col gap-10">
          <CareerStats stats={mockCareerStats} />
          <CareerMap locations={locations} onSelectLocation={setSelectedLocation} />
        </div>
      </div>

      <CityDetailModal
        location={selectedLocation}
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </section>
  );
};
