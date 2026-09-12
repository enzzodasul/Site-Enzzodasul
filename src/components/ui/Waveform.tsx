import React from 'react';
import { cn } from '../../utils/cn';

interface WaveformProps {
  bars?: number[];
  isPlaying?: boolean;
  className?: string;
  onSeek?: (percent: number) => void;
  progress?: number;
}

export const Waveform: React.FC<WaveformProps> = ({
  bars = [20, 45, 60, 80, 50, 90, 75, 40, 65, 85, 95, 70, 50, 80, 60, 40, 30, 85, 90, 65, 45, 20],
  isPlaying = false,
  className,
  onSeek,
  progress = 0,
}) => {
  return (
    <div
      className={cn('flex items-center gap-1 h-8 cursor-pointer select-none', className)}
      onClick={(e) => {
        if (!onSeek) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = (clickX / rect.width) * 100;
        onSeek(percent);
      }}
    >
      {bars.map((height, i) => {
        const barProgress = (i / bars.length) * 100;
        const isActive = barProgress <= progress;

        return (
          <div
            key={i}
            className={cn(
              'w-1 rounded-full transition-all duration-200',
              isActive ? 'bg-accent shadow-glow' : 'bg-surface-border hover:bg-text-muted',
              isPlaying && isActive && 'waveform-bar'
            )}
            style={{
              height: `${Math.max(15, height)}%`,
              animationDelay: `${(i % 5) * 0.15}s`,
            }}
          />
        );
      })}
    </div>
  );
};
