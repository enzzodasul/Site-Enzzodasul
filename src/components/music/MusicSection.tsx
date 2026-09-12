import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SongCard } from './SongCard';
import { Song } from '../../types';
import { spotifyService } from '../../services/spotifyService';
import { Music2, ExternalLink } from 'lucide-react';

export const MusicSection: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    spotifyService.getTopSongs().then((data) => {
      setSongs(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="music" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="DISCOGRAFIA OFICIAL SPOTIFY"
          title="THE SOUND OF ENZZO DA SUL"
          subtitle="Ouça as faixas oficiais diretamente do player verificado do Spotify."
        />

        {/* Embedded Official Spotify Player Widget */}
        <div className="mb-12 glass-panel p-4 sm:p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Music2 className="w-4 h-4" />
              <span>PLAYER OFICIAL VERIFICADO DO SPOTIFY</span>
            </div>
            <a
              href="https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Abrir no App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/artist/2bl0nc1YVl0cxi5m68pMEH?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Enzzo da Sul Official Spotify Player"
            className="shadow-2xl border border-surface-border"
          />
        </div>

        {/* Song Cards List */}
        {loading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-surface rounded-xl border border-surface-border" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {songs.map((song, idx) => (
              <SongCard key={song.id} song={song} rank={idx + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
