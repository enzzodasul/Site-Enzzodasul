import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { Waveform } from '../ui/Waveform';
import { formatTime } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export const GlobalAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    playNext,
    playPrev,
  } = useAudio();

  const [expanded, setExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  if (!currentTrack) return null;

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-player transition-all duration-300',
        expanded ? 'h-auto py-6' : 'h-20 py-2'
      )}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-2xl p-3 sm:p-4 shadow-2xl border border-surface-border backdrop-blur-xl flex flex-col gap-3">
          
          {/* Top Bar: Controls & Track Info */}
          <div className="flex items-center justify-between gap-3">
            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-surface-border shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base font-display font-bold text-text truncate">
                  {currentTrack.title}
                </span>
                <span className="text-xs font-mono text-text-muted truncate">
                  {currentTrack.artist} {currentTrack.featuredArtists?.length ? `ft. ${currentTrack.featuredArtists.join(', ')}` : ''}
                </span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={playPrev}
                className="p-2 text-text-muted hover:text-text transition-colors rounded-full"
                aria-label="Anterior"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-glow hover:scale-105 transition-transform"
                aria-label={isPlaying ? 'Pausar' : 'Tocar'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={playNext}
                className="p-2 text-text-muted hover:text-text transition-colors rounded-full"
                aria-label="Próxima"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Right utilities: Desktop Waveform & External link */}
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              <div className="w-48">
                <Waveform
                  bars={currentTrack.waveform}
                  isPlaying={isPlaying}
                  progress={progress}
                  onSeek={seek}
                />
              </div>

              <div className="text-xs font-mono text-text-dim w-20 text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button onClick={handleMuteToggle} className="text-text-muted hover:text-text">
                  {volume === 0 || isMuted ? <VolumeX className="w-4 h-4 text-accent" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 accent-accent h-1 bg-surface-border rounded-lg cursor-pointer"
                />
              </div>

              {currentTrack.spotifyUrl && (
                <a
                  href={currentTrack.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-muted hover:text-emerald-400 transition-colors"
                  title="Ouvir no Spotify"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Expand / Minimize Toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="lg:hidden p-2 text-text-muted hover:text-text"
            >
              {expanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Progress Bar (Always Visible on Mobile / Compact) */}
          <div className="w-full bg-surface-border h-1.5 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            seek((clickX / rect.width) * 100);
          }}>
            <div
              className="bg-accent h-full shadow-glow transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Mobile Expanded Details */}
          {expanded && (
            <div className="lg:hidden flex flex-col gap-4 pt-4 border-t border-surface-border animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-mono text-text-dim">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <Waveform
                bars={currentTrack.waveform}
                isPlaying={isPlaying}
                progress={progress}
                onSeek={seek}
              />

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button onClick={handleMuteToggle} className="text-text-muted hover:text-text">
                    {volume === 0 || isMuted ? <VolumeX className="w-4 h-4 text-accent" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 accent-accent h-1 bg-surface-border rounded-lg cursor-pointer"
                  />
                </div>

                {currentTrack.spotifyUrl && (
                  <a
                    href={currentTrack.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-md flex items-center gap-1.5"
                  >
                    <span>Abrir no Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
