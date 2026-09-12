import React from 'react';
import { Play, Pause, ExternalLink, Music2, Youtube } from 'lucide-react';
import { Song } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Waveform } from '../ui/Waveform';
import { formatNumber } from '../../utils/formatters';
import { useAudio } from '../../context/AudioContext';
import { cn } from '../../utils/cn';

interface SongCardProps {
  song: Song;
  rank?: number;
}

export const SongCard: React.FC<SongCardProps> = ({ song, rank }) => {
  const { currentTrack, isPlaying, playSong, seek, progress } = useAudio();
  const isCurrent = currentTrack?.id === song.id;
  const active = isCurrent && isPlaying;

  return (
    <Card className={cn('flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-5', active && 'border-accent/60 bg-accent/5')}>
      {/* Rank Indicator */}
      {rank !== undefined && (
        <span className="font-display text-xl sm:text-2xl font-black text-text-dim w-8 text-center shrink-0">
          #{rank}
        </span>
      )}

      {/* Cover Image with Play Overlay */}
      <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden group shrink-0">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={cn(
          'absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300',
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}>
          <button
            onClick={() => playSong(song)}
            className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
            aria-label={active ? 'Pausar' : 'Tocar'}
          >
            {active ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 w-full text-left">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg sm:text-xl font-display font-bold text-text truncate">
            {song.title}
          </h3>
          {song.featured && <Badge variant="accent">DESTAQUE</Badge>}
        </div>

        <p className="text-xs font-mono text-text-muted">
          {song.artist} {song.featuredArtists?.length ? `ft. ${song.featuredArtists.join(', ')}` : ''}
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-text-dim mt-2">
          <span>{formatNumber(song.plays)} PLAYS</span>
          <span>•</span>
          <span>{song.duration}</span>
          {song.album && (
            <>
              <span>•</span>
              <span className="truncate">{song.album}</span>
            </>
          )}
        </div>

        {/* Waveform for active song */}
        {isCurrent && (
          <div className="mt-3 w-full max-w-md">
            <Waveform
              bars={song.waveform}
              isPlaying={isPlaying}
              progress={progress}
              onSeek={seek}
            />
          </div>
        )}
      </div>

      {/* External Platform Links & Listen CTA */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-surface-border pt-3 sm:pt-0 shrink-0">
        <div className="flex items-center gap-2">
          {song.spotifyUrl && (
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-emerald-400 transition-colors rounded-lg bg-surface border border-surface-border"
              title="Spotify"
            >
              <Music2 className="w-4 h-4" />
            </a>
          )}
          {song.youtubeUrl && (
            <a
              href={song.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-red-500 transition-colors rounded-lg bg-surface border border-surface-border"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          )}
        </div>

        <button
          onClick={() => playSong(song)}
          className={cn(
            'px-4 py-2 text-xs font-display font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2',
            active ? 'bg-accent text-white shadow-glow' : 'bg-surface hover:bg-surface-hover text-text border border-surface-border'
          )}
        >
          {active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{active ? 'PAUSAR' : 'OUVIR'}</span>
        </button>
      </div>
    </Card>
  );
};
