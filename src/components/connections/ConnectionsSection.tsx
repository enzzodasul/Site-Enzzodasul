import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { NetworkGraph } from './NetworkGraph';
import { EntityDetailModal } from './EntityDetailModal';
import { Artist, Connection } from '../../types';
import { artistsService } from '../../services/artistsService';

export const ConnectionsSection: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  useEffect(() => {
    artistsService.getConnections().then((res) => {
      setArtists(res.artists);
      setConnections(res.connections);
    });
  }, []);

  return (
    <section id="connections" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="REDE ARTÍSTICA"
          title="CONNECTIONS NETWORK"
          subtitle="Explore as conexões entre Enzzo da Sul, colaboradores, produtores, compositores e feat. de destaque."
        />

        <NetworkGraph
          artists={artists}
          connections={connections}
          onSelectArtist={setSelectedArtist}
        />
      </div>

      <EntityDetailModal
        artist={selectedArtist}
        isOpen={!!selectedArtist}
        onClose={() => setSelectedArtist(null)}
      />
    </section>
  );
};
